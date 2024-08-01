// In convex/bookings.ts

import { mutation } from './_generated/server';
import { v } from 'convex/values';
import { ConvexError } from 'convex/values';
import { Id } from './_generated/dataModel';

// Define types
interface BookingSlot {
    date: string;
    time: string;
}

interface TenantConfig {
    businessHours: Record<string, { start: string; end: string }>;
    bookingWindowDays: number;
    slotDurationMinutes: number;
    timezone: string;
}

interface Booking {
    _id: Id<"bookings">;
    date: string;
    time: string;
    duration: number;
}

export const rebook = mutation({
    args: {
        serviceId: v.id('services'),
        vehicleId: v.id('vehicles'),
        userId: v.string(),
        organizationId: v.id('organizations'),
    },
    handler: async (ctx, args): Promise<BookingSlot & { bookingId: Id<"bookings"> }> => {
        const { serviceId, vehicleId, userId, organizationId } = args;

        // Fetch tenant configuration
        const tenantConfig = await ctx.db.get(organizationId);

        if (!tenantConfig) {
            throw new ConvexError('Tenant configuration not found');
        }

        // Fetch service details
        const service = await ctx.db.get(serviceId);

        if (!service) {
            throw new ConvexError('Service not found');
        }

        // Fetch existing bookings
        const startDate = new Date();
        const endDate = new Date(startDate.getTime() + tenantConfig.bookingWindowDays * 24 * 60 * 60 * 1000);

        const existingBookings = await ctx.db
            .query('bookings')
            .withIndex('by_org_and_date', q =>
                q.eq('organizationId', organizationId)
                    .gte('date', startDate.toISOString().split('T')[0])
                    .lte('date', endDate.toISOString().split('T')[0])
            )
            .collect();

        // Find the next available slot
        const availableSlot = findNextAvailableSlot(
            tenantConfig,
            existingBookings,
            service.duration
        );

        if (!availableSlot) {
            throw new ConvexError(`No available slots in the next ${tenantConfig.bookingWindowDays} days`);
        }

        // Create the booking
        const newBookingId = await ctx.db.insert('bookings', {
            serviceId,
            vehicleId,
            userId,
            organizationId,
            date: availableSlot.date,
            time: availableSlot.time,
            status: 'confirmed',
            createdAt: new Date().toISOString(),
        });

        return { ...availableSlot, bookingId: newBookingId };
    },
});

function findNextAvailableSlot(
    tenantConfig: TenantConfig,
    existingBookings: Booking[],
    serviceDuration: number
): BookingSlot | null {
    const { businessHours, bookingWindowDays, slotDurationMinutes, timezone } = tenantConfig;
    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + bookingWindowDays * 24 * 60 * 60 * 1000);

    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long', timeZone: timezone }).toLowerCase();
        const hours = businessHours[dayOfWeek];

        if (!hours) continue; // Skip days when business is closed

        const startTime = new Date(`${date.toISOString().split('T')[0]}T${hours.start}:00`);
        const endTime = new Date(`${date.toISOString().split('T')[0]}T${hours.end}:00`);

        for (let time = startTime; time < endTime; time.setMinutes(time.getMinutes() + slotDurationMinutes)) {
            const slot: BookingSlot = {
                date: date.toISOString().split('T')[0],
                time: time.toTimeString().slice(0, 5)
            };

            const isSlotAvailable = !existingBookings.some(booking =>
                booking.date === slot.date &&
                booking.time === slot.time &&
                time.getTime() + serviceDuration * 60000 <= new Date(`${slot.date}T${booking.time}`).getTime()
            );

            if (isSlotAvailable) {
                return slot;
            }
        }
    }

    return null; // No available slot found
}
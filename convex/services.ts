// In your Convex functions file (e.g., services.ts)
import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

export const getPreviousServices = query({
  args: { vehicleId: v.string(), userId: v.string() },
  handler: async (ctx, args) => {
    const { vehicleId, userId } = args;
    
    return await ctx.db
      .query('services')
      .withIndex('by_vehicle_and_user', q => 
        q.eq('vehicleId', vehicleId).eq('userId', userId)
      )
      .order('desc')
      .take(10);  // Limit to last 10 services
  },
});

// In bookings.ts
export const createBooking = mutation({
  args: { 
    serviceId: v.string(),
    vehicleId: v.string(),
    userId: v.string(),
    slot: v.object({
      date: v.string(),
      time: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const { serviceId, vehicleId, userId, slot } = args;
    
    // Add logic to check if the slot is still available
    
    const bookingId = await ctx.db.insert('bookings', {
      serviceId,
      vehicleId,
      userId,
      date: slot.date,
      time: slot.time,
      status: 'confirmed',
    });

    return bookingId;
  },
});
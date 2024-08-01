// convex/createBooking.ts

import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

// Define types
interface Client {
  name: string;
  email: string;
}

interface Booking {
  client: Client;
  services: string[];
  date: string;
  status: string;
}

export const createBooking = mutation({
  args: {
    client: v.object({
      name: v.string(),
      email: v.string(),
    }),
    services: v.array(v.string()),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    const { client, services, date } = args;
    const bookingId = await ctx.db.insert("bookings", { client, services, date, status: "scheduled" });
    return bookingId;
  },
});

export const updateBookingStatus = mutation({
  args: {
    bookingId: v.id("bookings"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const { bookingId, status } = args;
    await ctx.db.patch(bookingId, { status });
  },
});

export const getBookingDetails = query({
  args: {
    bookingId: v.id("bookings"),
  },
  handler: async (ctx, args) => {
    const { bookingId } = args;
    const booking = await ctx.db.get(bookingId);
    return booking;
  },
});

export const getBookings = query({
  handler: async (ctx) => {
    const bookings = await ctx.db.query("bookings").collect();
    return bookings;
  },
});

// Note: SendGrid integration should be handled in a separate file, possibly as an action
// Here's a placeholder for how you might structure the email sending function
export const sendReminderEmail = mutation({
  args: {
    bookingId: v.id("bookings"),
  },
  handler: async (ctx, args) => {
    const { bookingId } = args;
    const booking = await ctx.db.get(bookingId);
    if (!booking) {
      throw new Error("Booking not found");
    }

    // Here you would typically call an action to send the email
    // For example:
    // await ctx.runAction(sendEmailAction, {
    //   to: booking.client.email,
    //   subject: "Appointment Reminder",
    //   text: `This is a reminder for your upcoming appointment on ${booking.date}.`,
    // });

    // For now, we'll just log the reminder
    console.log(`Reminder email would be sent to ${booking.client.email} for booking on ${booking.date}`);
  },
});
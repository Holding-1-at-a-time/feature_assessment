import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

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
    const bookingId = await ctx.db.insert("bookings", { client, services, date });
    return bookingId;
  },
});

export const updateBookingStatus = mutation({
    args: {
      bookingId: v.string(),
      status: v.string(),
    },
    handler: async (ctx, args) => {
      const { bookingId, status } = args;
      await ctx.db.update("bookings", bookingId, { status });
    },
  });

  import { query } from "./_generated/server";
import { v } from "convex/values";

export const getBookingDetails = query({
  args: {
    bookingId: v.string(),
  },
  handler: async (ctx, args) => {
    const { bookingId } = args;
    const booking = await ctx.db.get(bookingId);
    return booking;
  },
});import sendGrid from '@sendgrid/mail';

sendGrid.setApiKey(process.env.SENDGRID_API_KEY);

export const sendReminderEmail = async (bookingDetails, time) => {
  const msg = {
    to: bookingDetails.client.email,
    from: 'no-reply@yourdomain.com',
    subject: 'Appointment Reminder',
    text: `This is a reminder for your upcoming appointment on ${bookingDetails.date}.`,
  };

  await sendGrid.send(msg);
};import sendGrid from '@sendgrid/mail';

sendGrid.setApiKey(process.env.SENDGRID_API_KEY);

export const sendReminderEmail = async (bookingDetails, time) => {
  const msg = {
    to: bookingDetails.client.email,
    from: 'no-reply@yourdomain.com',
    subject: 'Appointment Reminder',
    text: `This is a reminder for your upcoming appointment on ${bookingDetails.date}.`,
  };

  await sendGrid.send(msg);
};

export const getBookings = query({
  handler: async (ctx) => {
    const bookings = await ctx.db.query("bookings").collect();
    return bookings;
  },
});
import { mutation } from "./_generated/server";
import { sendReminderEmail } from '../utils/sendGrid';

export const scheduleReminders = mutation({
  args: {
    bookingId: v.id("bookings"),
    reminderTimes: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const { bookingId, reminderTimes } = args;
    const bookingDetails = await ctx.db.get(bookingId);

    reminderTimes.forEach(async (time) => {
      // Schedule reminder email
      await sendReminderEmail(bookingDetails, time);
    });
  },
});
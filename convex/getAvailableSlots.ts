import { query } from "./_generated/server";

export const getAvailableSlots = query({
  handler: async (ctx) => {
    const slots = await ctx.db.query("availableSlots").collect();
    return slots;
  },
});
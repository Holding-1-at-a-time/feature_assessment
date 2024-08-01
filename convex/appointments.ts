import { query } from "./_generated/server";
import { v } from "convex/values";

export const getAppointments = query({
  args: {
    page: v.number(),
    pageSize: v.number(),
  },
  handler: async (ctx, args) => {
    const { page, pageSize } = args;
    return await ctx.db.query("appointments")
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .collect();
  },
});
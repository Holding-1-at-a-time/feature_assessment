import { query } from "./_generated/server";

export const getPolicyDetails = query({
  handler: async (ctx) => {
    const policies = await ctx.db.query("policies").collect();
    return policies;
  },
});
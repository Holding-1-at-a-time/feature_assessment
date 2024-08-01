import { query } from "./_generated/server";

export const listVehicleParts = query({
  handler: async (ctx) => {
    const parts = await ctx.db.query("vehicleParts").collect();
    return parts;
  },
});
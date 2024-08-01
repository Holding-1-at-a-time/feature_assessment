import { query } from "./_generated/server";

export const getCustomizationOptions = query({
  handler: async (ctx) => {
    const options = await ctx.db.query("customizations").collect();
    return options;
  },
});
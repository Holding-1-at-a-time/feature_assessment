import { query } from "./_generated/server";
import { v } from "convex/values";

export const calculateDeposit = query({
  args: {
    services: v.array(v.object({ id: v.string(), quantity: v.number() })),
    customerPreferences: v.object({
      preferredDate: v.string(),
      additionalNotes: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const { services, customerPreferences } = args;
    let totalDeposit = 0;

    for (const service of services) {
      const serviceDetails = await ctx.db.get(service.id);
      totalDeposit += serviceDetails.price * service.quantity;
    }

    // Additional logic based on customerPreferences can be added here

    return totalDeposit;
  },
});
import { query } from "./_generated/server";
import { v } from "convex/values";
import { getOrganizationContext } from 'clerk';

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
    const organization = getOrganizationContext(ctx);
    let totalDeposit = 0;

    for (const service of services) {
      const serviceDetails = await ctx.db.get(service.id);
      const orgPricing = await ctx.db.query('pricingPolicies').filter({ organizationId: organization.id }).first();
      const price = orgPricing ? orgPricing.price : serviceDetails.price;
      totalDeposit += price * service.quantity;
    }

    // Additional logic based on customerPreferences can be added here

    return totalDeposit;
  },
});
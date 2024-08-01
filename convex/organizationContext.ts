import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getOrganizationContext } from 'clerk';

export const getOrganizationPricing = query({
  args: {},
  handler: async (ctx) => {
    const organization = getOrganizationContext(ctx);
    return await ctx.db.query('pricingPolicies').filter({ organizationId: organization.id }).first();
  },
});

export const updateOrganizationPricing = mutation({
  args: {
    pricingPolicy: v.object({
      organizationId: v.string(),
      price: v.number(),
    }),
  },
  handler: async (ctx, args) => {
    const { pricingPolicy } = args;
    await ctx.db.update('pricingPolicies', pricingPolicy);
  },
});
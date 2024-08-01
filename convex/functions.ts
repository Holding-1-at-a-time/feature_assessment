import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Fetch available services and prices
export const getServiceList = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("services").collect();
  },
});

// Compute detailed estimates
export const calculateEstimate = mutation({
  args: {
    services: v.array(v.object({ id: v.string(), quantity: v.number() })),
    vehicleDetails: v.object({
      make: v.string(),
      model: v.string(),
      year: v.number(),
    }),
  },
  handler: async (ctx, args) => {
    // Implement pricing logic here
    const { services, vehicleDetails } = args;
    // Example calculation logic
    let totalPrice = 0;
    for (const service of services) {
      const serviceDetails = await ctx.db.get(service.id);
      totalPrice += serviceDetails.price * service.quantity;
    }
    return { totalPrice };
  },
});

// Retrieve factors affecting pricing
export const getVehicleFactors = query({
  args: { make: v.string(), model: v.string(), year: v.number() },
  handler: async (ctx, args) => {
    return await ctx.db.query("vehicleFactors").filter(args).first();
  },
});

// Provide industry average prices for comparisons
export const getIndustryAverages = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("industryAverages").collect();
  },
});

// Enable saving and retrieving estimates
export const saveEstimate = mutation({
  args: {
    estimate: v.object({
      services: v.array(v.object({ id: v.string(), quantity: v.number() })),
      vehicleDetails: v.object({
        make: v.string(),
        model: v.string(),
        year: v.number(),
      }),
      totalPrice: v.number(),
    }),
  },
  handler: async (ctx, args) => {
    const { estimate } = args;
    const id = await ctx.db.insert("estimates", estimate);
    return { id };
  },
});

// Fetch add-on options and prices
export const getCustomizationOptions = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("customizations").collect();
  },
});
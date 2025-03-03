import { query } from "./_generated/server";
import { v } from "convex/values";

export const estimateServiceDuration = query({
  args: {
    servicesId: v.array(v.id("services")),
  },
  handler: async (ctx, args) => {
    const { services } = args;
    let totalDuration = 0;

    for (const serviceId of services) {
      const service = await ctx.db.get(serviceId);
      totalDuration += service.duration;
    }

    return totalDuration;
  },
});
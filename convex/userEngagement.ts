export const logUserEngagement = mutation({
  args: {
    userId: v.Id("users"),
    action: v.string(),
    timestamp: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("userEngagementLogs", args);
  },
});

export const logEstimateConversion = mutation({
  args: {
    estimateId: v.id("estimates"),
    userId: v.id("users"),
    timestamp: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("estimateConversionLogs", args);
  },
});
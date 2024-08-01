export const logUserEngagement = mutation({
  args: {
    userId: v.string(),
    action: v.string(),
    timestamp: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("userEngagementLogs", args);
  },
});

export const logEstimateConversion = mutation({
  args: {
    estimateId: v.string(),
    userId: v.string(),
    timestamp: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("estimateConversionLogs", args);
  },
});
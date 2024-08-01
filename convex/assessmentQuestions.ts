import { query } from "./_generated/server";
import { v } from "convex/values";

export const getQuestions = query({
  args: {
    vehicleType: v.string(),
    reportedIssues: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const { vehicleType, reportedIssues } = args;
    const questions = await ctx.db.query("questions")
      .filter({ vehicleType, reportedIssues })
      .collect();
    return questions;
  },
});

export const getAssessmentSummary = query({
  args: {
    assessmentId: v.string(),
  },
  handler: async (ctx, args) => {
    const { assessmentId } = args;
    const summary = await ctx.db.get(assessmentId);
    return summary;
  },
});
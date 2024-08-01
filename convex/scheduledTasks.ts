import { scheduledTask } from "./_generated/server";
import { generateDailyReport, generateWeeklyReport, generateMonthlyReport } from './reportGenerators';

export const dailyReportTask = scheduledTask({
  cron: '0 0 * * *', // Every day at midnight
  handler: async (ctx) => {
    await generateDailyReport(ctx);
  },
});

export const weeklyReportTask = scheduledTask({
  cron: '0 0 * * 0', // Every Sunday at midnight
  handler: async (ctx) => {
    await generateWeeklyReport(ctx);
  },
});

export const monthlyReportTask = scheduledTask({
  cron: '0 0 1 * *', // On the first day of every month at midnight
  handler: async (ctx) => {
    await generateMonthlyReport(ctx);
  },
});
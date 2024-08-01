import { query } from "./_generated/server";
import { v } from "convex/values";

export const getServicePopularity = query({
  handler: async (ctx) => {
    return await ctx.db.query("services").collect();
  },
});

export const getRevenueData = query({
  handler: async (ctx) => {
    return await ctx.db.query("revenue").collect();
  },
});

export const getCustomerRetention = query({
  handler: async (ctx) => {
    return await ctx.db.query("customerRetention").collect();
  },
});

export const getAppointmentDurations = query({
  handler: async (ctx) => {
    return await ctx.db.query("appointmentDurations").collect();
  },
});

export const getCustomerSatisfaction = query({
  handler: async (ctx) => {
    return await ctx.db.query("customerSatisfaction").collect();
  },
});

export const getStaffProductivity = query({
  handler: async (ctx) => {
    return await ctx.db.query("staffProductivity").collect();
  },
});

export const getServicesReceived = query({
  handler: async (ctx) => {
    return await ctx.db.query("servicesReceived").collect();
  },
});

export const getSpendingHistory = query({
  handler: async (ctx) => {
    return await ctx.db.query("spendingHistory").collect();
  },
});

export const getVehicleConditionTrends = query({
  handler: async (ctx) => {
    return await ctx.db.query("vehicleConditionTrends").collect();
  },
});
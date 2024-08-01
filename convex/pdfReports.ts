import { mutation } from "./_generated/server";
import { generatePDFReport } from './pdfGenerator';

export const generateClientReport = mutation({
  args: {
    clientId: v.string(),
  },
  handler: async (ctx, args) => {
    const { clientId } = args;
    await generatePDFReport(ctx, clientId);
  },
});
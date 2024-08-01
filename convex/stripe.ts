import { mutation } from "./_generated/server";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

export const processRefund = mutation({
  args: {
    depositId: v.string(),
  },
  handler: async (ctx, args) => {
    const { depositId } = args;
    const deposit = await ctx.db.get(depositId);

    if (!deposit) {
      throw new Error('Deposit not found');
    }

    const refund = await stripe.refunds.create({
      payment_intent: deposit.paymentIntentId,
    });

    await ctx.db.update(depositId, { status: 'refunded' });

    return refund;
  },
});

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

export const processPayment = mutation({
  args: {
    amount: v.number(),
    paymentMethodId: v.string(),
  },
  handler: async (ctx, args) => {
    const { amount, paymentMethodId } = args;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true,
    });

    return paymentIntent;
  },
});


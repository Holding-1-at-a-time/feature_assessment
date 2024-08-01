import { mutation, query } from "./_generated/server";
import Stripe from 'stripe';


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


export const getDeposits = query({
  handler: async (ctx) => {
    const deposits = await ctx.db.query("deposits").collect();
    return deposits;
  },
});
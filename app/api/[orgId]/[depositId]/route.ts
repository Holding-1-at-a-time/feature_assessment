import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { calculateDeposit } from '../../convex/functions';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { services, customerPreferences } = req.body;
    const depositAmount = await calculateDeposit({ services, customerPreferences });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: depositAmount,
      currency: 'usd',
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
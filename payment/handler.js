'use strict';

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPayment = async (event) => {
  try {
    const { amount } = JSON.parse(event.body);

    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ payment }),
    };
  } catch (error) {
    console.log({ error });

    return { statusCode: 400, body: JSON.stringify({ error }) };
  }
};

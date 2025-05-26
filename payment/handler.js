'use strict';

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const allowedOrigins = [
  'http://localhost:5173',
  'https://chairsstore.vercel.app',
];

export async function createPayment(event) {
  const origin = event.headers.origin;
  const isAllowedOrigin = allowedOrigins.includes(origin);

  console.log('Request origin:', origin);
  console.log('Event body:', event.body);
  console.log('Allowed:', isAllowedOrigin);

  const corsHeaders = isAllowedOrigin
    ? {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'OPTIONS,POST',
      }
    : {};

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }

  try {
    const { amount } = JSON.parse(event.body);
    console.log('Amount received:', amount);

    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ payment }),
    };
  } catch (error) {
    console.error('Payment error:', error);

    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: error.message }),
    };
  }
}

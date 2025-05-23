'use strict';

const stripe = require('stripe')(process.env.STRIPE_SECRTE_KEY);

module.exports.createPayment = async (event) => {
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

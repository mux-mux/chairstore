import styled from 'styled-components';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Button from '../Button/Button';
import React from 'react';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const paymentHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const response = await fetch(
      'https://tr9rpb78w8.execute-api.us-east-1.amazonaws.com/dev/create-payment',
      {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 1000 }),
      }
    );
    const data = await response.json();

    const clientSecret = data.paymentIntent.client_secret;

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      alert('Card details not found.');
      return;
    }

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: 'user',
        },
      },
    });

    if (paymentResult.error) {
      alert(paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status === 'succeeded') {
        alert('Payment Successful');
      }
    }
  };

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment:</h2>
        <CardElement />
        <Button variant="inverted">Pay</Button>
      </FormContainer>
    </PaymentFormContainer>
  );
};

const PaymentFormContainer = styled.div`
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FormContainer = styled.form`
  height: 100px;
  min-width: 500px;
`;

export default PaymentForm;

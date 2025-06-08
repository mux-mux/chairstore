import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { StripeCardElement } from '@stripe/stripe-js';
import { PaymentResponseType } from '../../types/payment';
import Button from '../Button/Button';
import { selectCartPrice } from '../../store/cart/selector';
import { selectUser } from '../../store/user/selector';

const PaymentForm = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const amount = useSelector(selectCartPrice);
  const user = useSelector(selectUser);
  const stripe = useStripe();
  const elements = useElements();

  const paymentHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    const response = await fetch(
      'https://tr9rpb78w8.execute-api.us-east-1.amazonaws.com/dev/create-payment',
      {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amount * 100 }),
      }
    );
    const data: PaymentResponseType = await response.json();

    const clientSecret = data.payment.client_secret;

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      alert('Card details not found.');
      setIsProcessing(false);
      return;
    }

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement as StripeCardElement,
        billing_details: {
          name: user?.displayName || 'Guest',
          email: user?.email,
        },
      },
    });

    setIsProcessing(false);

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
        <PaymentButton variant="inverted" loading={isProcessing}>
          Pay
        </PaymentButton>
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

const PaymentButton = styled(Button)`
  margin-top: 16px;
`;

export default PaymentForm;

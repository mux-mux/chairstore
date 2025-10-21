import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartPrice } from '../../store/cart/selector';
import { selectUser } from '../../store/user/selector';
import styled from 'styled-components';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import Button from '../Button/Button';
import type { PaymentResponseType } from '../../types/payment';
import { clearAllItemsFromCart } from '../../store/cart/reducer';

const CARD_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#32325d',
      '::placeholder': {
        color: '#a0aec0',
      },
    },
    invalid: {
      color: '#e53e3e',
    },
  },
};

const PaymentForm = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const dispatch = useDispatch();
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
    const cardNumber = elements.getElement(CardNumberElement);

    if (!cardNumber) {
      alert('Card details not found.');
      setIsProcessing(false);
      return;
    }

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardNumber,
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
        alert('Payment Successful. We will contact you soon!');

        cardNumber.clear();
        elements.getElement(CardExpiryElement)?.clear();
        elements.getElement(CardCvcElement)?.clear();
        dispatch(clearAllItemsFromCart());
      }
    }
  };

  return (
    <PaymentFormContainer>
      <Form onSubmit={paymentHandler}>
        <h2>Credit Card Payment:</h2>
        <Label>Card Number</Label>
        <CardNumberElement options={CARD_OPTIONS} />

        <Label>Expiration Date</Label>
        <CardExpiryElement options={CARD_OPTIONS} />

        <Label>CVC</Label>
        <CardCvcElement options={CARD_OPTIONS} />

        <PaymentButton variant="primary" loading={isProcessing}>
          Pay Now
        </PaymentButton>
      </Form>
    </PaymentFormContainer>
  );
};

const PaymentFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[4]};
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSize[1]};
  font-weight: 600;
`;

const PaymentButton = styled(Button)`
  margin-top: 16px;
`;

export default PaymentForm;

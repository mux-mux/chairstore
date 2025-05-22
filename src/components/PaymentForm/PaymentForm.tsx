import styled from 'styled-components';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Button from '../Button/Button';
import React from 'react';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const paymentHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || elements) return;

    console.log({ stripe, elements });
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

import { useState, useCallback, FormEvent, ChangeEvent } from 'react';
import styled from 'styled-components';
import { FirebaseError } from 'firebase/app';
import {
  signInWithGooglePopup,
  signInUserWithEmailAndPassword,
} from '../../utils/firebase/firebase';
import FormInput from '../FormInput/FormInput';
import Button from '../Button/Button';
import type { FormFieldsType } from '../../types/form';

const INITIAL_FORM_FIELDS: FormFieldsType = {
  email: '',
  password: '',
};

const SignIn = () => {
  const [formFields, setFormFields] =
    useState<FormFieldsType>(INITIAL_FORM_FIELDS);
  const { email, password } = formFields;

  const resetForm = (): void => {
    setFormFields(INITIAL_FORM_FIELDS);
  };

  const signInWithGoogle = async (): Promise<void> => {
    try {
      await signInWithGooglePopup();
    } catch (err) {
      console.error('Google sign-in failed:', err);
    }
  };

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      const { name, value } = event.target;

      setFormFields((prevFields) => ({
        ...prevFields,
        [name]: value,
      }));
    },
    []
  );

  const handleOnSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();

      try {
        const userCredential = await signInUserWithEmailAndPassword(
          email,
          password
        );
        if (!userCredential) {
          throw new Error('Failed to sign in user');
        }

        resetForm();
      } catch (error) {
        if (error instanceof FirebaseError) {
          switch (error.code) {
            case 'auth/wrong-password': {
              return alert('Incorrect password for email');
            }
            case 'auth/user-not-found': {
              return alert('No user associated with this email');
            }
            default:
              console.log('Firebase error code:', error.code);
          }
        } else if (error instanceof Error) {
          console.log(error.message);
        }
      }
    },
    [email, password]
  );

  return (
    <SignInContainer>
      <SignInHeading>Already have an account?</SignInHeading>
      <span>Sign in with your email and password</span>
      <SignInForm onSubmit={handleOnSubmit}>
        <FormInput
          label="Email"
          type="email"
          name="email"
          placeholder=""
          value={email}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          placeholder=""
          value={password}
          onChange={handleChange}
          required
        />
        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button type="button" variant="primary" onClick={signInWithGoogle}>
            Google sign in
          </Button>
        </ButtonsContainer>
      </SignInForm>
    </SignInContainer>
  );
};

const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;
  margin: 0 auto;
`;

const SignInHeading = styled.h2`
  margin: 10px 0;
`;

const SignInForm = styled.form`
  margin-top: auto;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: auto;
`;

export default SignIn;

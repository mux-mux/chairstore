import { useState, useCallback, FormEvent, ChangeEvent } from 'react';
import styled from 'styled-components';

import { FirebaseError } from 'firebase/app';
import {
  UserAuth,
  createUserDocument,
  createAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase';

import FormInput from '../FormInput/FormInput';
import Button from '../Button/Button';

const INITIAL_FORM_FIELDS = {
  displayName: '',
  email: '',
  password: '',
};

const SignUp = () => {
  const [formFields, setFormFields] = useState(INITIAL_FORM_FIELDS);
  const { displayName, email, password } = formFields;

  const resetForm = () => {
    setFormFields(INITIAL_FORM_FIELDS);
  };

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  }, []);

  const handleOnSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      try {
        const userCredential = await createAuthUserWithEmailAndPassword(
          email,
          password
        );

        if (!userCredential) {
          throw new Error('Failed to create user');
        }

        const { user } = userCredential;

        const userAuth: UserAuth = {
          uid: user.uid,
          displayName: user.displayName || '',
          email: user.email || '',
        };

        await createUserDocument(userAuth, { displayName });

        resetForm();
      } catch (error) {
        if (error instanceof FirebaseError) {
          switch (error.code) {
            case 'auth/email-already-in-use': {
              return alert('Cannot create user. Email already in use');
            }
            default:
              console.log('Firebase error code:', error.code);
          }
        } else if (error instanceof Error) {
          console.log(error.message);
        }
      }
    },
    [email, password, displayName]
  );

  return (
    <SignUpContainer>
      <SignUpHeading>Don't have an account?</SignUpHeading>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleOnSubmit}>
        <FormInput
          label="Name"
          type="text"
          name="displayName"
          placeholder=""
          value={displayName}
          onChange={handleChange}
          required
        />
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
        <Button type="submit" variant="default">
          Sign Up
        </Button>
      </form>
    </SignUpContainer>
  );
};

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;
  margin: 0 auto;
`;

const SignUpHeading = styled.h2`
  margin: 10px 0;
`;

export default SignUp;

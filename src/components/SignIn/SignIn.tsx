import { useState, useCallback, FormEvent, ChangeEvent } from 'react';
import styled from 'styled-components';

import {
  UserAuth,
  signInWithGooglePopup,
  signInUserWithEmailAndPassword,
  createUserDocument,
} from '../../utils/firebase/firebase';

import FormInput from '../FormInput/FormInput';
import Button from '../Button/Button';

const INITIAL_FORM_FIELDS = {
  email: '',
  password: '',
};

const SignIn = () => {
  const [formFields, setFormFields] = useState(INITIAL_FORM_FIELDS);
  const { email, password } = formFields;

  const resetForm = () => {
    setFormFields(INITIAL_FORM_FIELDS);
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();

    const userAuth: UserAuth = {
      uid: user.uid,
      displayName: user.displayName || '',
      email: user.email || '',
    };

    await createUserDocument(userAuth, {});
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
        const response = await signInUserWithEmailAndPassword(email, password);
        console.log(response);
        resetForm();
      } catch (error) {
        console.log(error);
      }
    },
    [email, password]
  );

  return (
    <SignInContainer>
      <SignInHeading>Already have an account?</SignInHeading>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleOnSubmit}>
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
          <Button type="submit" variant="default">
            Sign In
          </Button>
          <Button variant="google" onClick={signInWithGoogle}>
            Google sign in
          </Button>
        </ButtonsContainer>
      </form>
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

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

export default SignIn;

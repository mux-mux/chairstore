import { useState, useCallback, FormEvent, ChangeEvent } from 'react';
import styled from 'styled-components';
import { FirebaseError } from 'firebase/app';
import {
  createUserDocument,
  createAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase';
import FormInput from '../FormInput/FormInput';
import Button from '../Button/Button';
import type { AdditionalInfo, UserType } from '../../types/user';
import type { FormFieldsType, FormErrorsType } from '../../types/form';
import { validateField } from '../../utils/validations/InputsValidation';

const INITIAL_FORM_FIELDS: FormFieldsType = {
  displayName: '',
  email: '',
  password: '',
};

const SignUp = () => {
  const [formFields, setFormFields] =
    useState<FormFieldsType>(INITIAL_FORM_FIELDS);
  const [errors, setErrors] = useState<FormErrorsType>({});
  const { displayName, email, password } = formFields;

  const resetForm = (): void => {
    setFormFields(INITIAL_FORM_FIELDS);
  };

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      const { name, value } = event.target;

      setFormFields((prevFields) => ({
        ...prevFields,
        [name]: value,
      }));

      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validateField(name, value),
      }));
    },
    []
  );

  const handleOnSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();

      const newErrors: { [key: string]: string } = {};
      Object.entries(formFields).forEach(([name, value]) => {
        const error = validateField(name, value);
        if (error) newErrors[name] = error;
      });

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      try {
        const userCredential = await createAuthUserWithEmailAndPassword(
          email,
          password
        );

        if (!userCredential) {
          throw new Error('Failed to create user');
        }

        const { user } = userCredential;

        const userAuth: UserType = {
          uid: user.uid,
          displayName: user.displayName || '',
          email: user.email || '',
        };
        const additionalInfo: AdditionalInfo = { displayName };

        await createUserDocument(userAuth, additionalInfo);

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
    [email, password, displayName, formFields]
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
          error={errors.displayName}
        />
        <FormInput
          label="Email"
          type="email"
          name="email"
          placeholder=""
          value={email}
          onChange={handleChange}
          error={errors.email}
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          placeholder=""
          value={password}
          onChange={handleChange}
          error={errors.password}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </SignUpContainer>
  );
};

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 380px;
`;

const SignUpHeading = styled.h2`
  margin: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[0]};
`;

export default SignUp;

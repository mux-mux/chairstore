import { useState, useCallback, FormEvent, ChangeEvent } from 'react';
import { FirebaseError } from 'firebase/app';
import { createAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase';
import { UserAuth, createUserDocument } from '../../utils/firebase/firebase';
import FormInput from '../FormInput/FormInput';

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
          console.log('Firebase error code:', error.code);
          console.log('Firebase error message:', error.message);
          if (error.code === 'auth/email-already-in-use')
            alert('Cannot create user. Email already in use');
        } else if (error instanceof Error) {
          console.log(error.message);
        }
      }
    },
    [email, password, displayName]
  );

  return (
    <div>
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
        <button>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;

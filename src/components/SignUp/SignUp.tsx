import { useState, useCallback, FormEvent, ChangeEvent } from 'react';
import { FirebaseError } from 'firebase/app';
import { createAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase';
import { UserAuth, createUserDocument } from '../../utils/firebase/firebase';

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

        const userDocRef = await createUserDocument(userAuth, { displayName });
        console.log(userDocRef);
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
        <label htmlFor="">Name</label>
        <input
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          required
        />

        <label htmlFor="">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />

        <label htmlFor="">Password</label>
        <input
          type="password"
          name="password"
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

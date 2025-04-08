import { useState, useCallback, FormEvent, ChangeEvent } from 'react';

const INITIAL_FORM_FIELDS = {
  username: '',
  email: '',
  password: '',
};

const SignUp = () => {
  const [formFields, setFormFields] = useState(INITIAL_FORM_FIELDS);
  const { username, email, password } = formFields;

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  }, []);

  const handleOnSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }, []);

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="">Name</label>
        <input
          type="text"
          name="username"
          value={username}
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

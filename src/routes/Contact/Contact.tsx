import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button/Button';
import FormInput from '../../components/FormInput/FormInput';
import { FormErrorsType } from '../../types/form';
import { validateField } from '../../utils/validations/InputsValidation';

const Contact = () => {
  const [formFields, setFormFields] = useState({
    displayName: '',
    email: '',
    message: '',
  });
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrorsType>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormFields((prev) => ({ ...prev, [name]: value }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  const handleAutoResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};
    Object.entries(formFields).forEach(([name, value]) => {
      const error = validateField(name, value);
      if (error) newErrors[name] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSuccess(true);
    setFormFields({ displayName: '', email: '', message: '' });
  };

  return (
    <ContactContainer>
      <ContactHeading>Contact Us</ContactHeading>
      <ContactForm onSubmit={handleSubmit}>
        <FormInput
          label="Name"
          type="name"
          name="displayName"
          placeholder=""
          value={formFields.displayName}
          onChange={handleChange}
          error={errors.displayName}
        />
        <FormInput
          label="Email"
          type="email"
          name="email"
          placeholder=""
          value={formFields.email}
          onChange={handleChange}
          error={errors.email}
        />

        <FormInput
          label="Message"
          type="textarea"
          name="message"
          placeholder=""
          value={formFields.message}
          onChange={handleChange}
          onInput={handleAutoResize}
          error={errors.message}
        />

        <Button type="submit" variant="primary">
          Send Message
        </Button>
      </ContactForm>
      {success && (
        <SuccessMessage>
          Thank you! We'll get back to you shortly.
        </SuccessMessage>
      )}
    </ContactContainer>
  );
};

const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 480px;
  margin: auto;
`;

const ContactForm = styled.form`
  margin-top: auto;
`;

const ContactHeading = styled.h2`
  margin: ${({ theme }) => theme.space[2]} 0;
`;

const SuccessMessage = styled.p`
  margin-top: ${({ theme }) => theme.space[4]};
  color: green;
`;

export default Contact;

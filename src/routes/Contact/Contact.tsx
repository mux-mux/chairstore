import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button/Button';
import FormInput from '../../components/FormInput/FormInput';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAutoResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitted:', formData);
    setSuccess(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <ContactContainer>
      <ContactHeading>Contact Us</ContactHeading>
      <ContactForm onSubmit={handleSubmit}>
        <FormInput
          label="Name"
          type="name"
          name="name"
          placeholder=""
          value={formData.name}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Email"
          type="email"
          name="email"
          placeholder=""
          value={formData.email}
          onChange={handleChange}
          required
        />

        <FormInput
          label="Message"
          type="textarea"
          name="message"
          placeholder=""
          value={formData.message}
          onChange={handleChange}
          onInput={handleAutoResize}
          required
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
  margin: 0 auto;
`;

const ContactForm = styled.form`
  margin-top: auto;
`;

const ContactHeading = styled.h2`
  margin: 10px 0;
`;

const SuccessMessage = styled.p`
  margin-top: 1rem;
  color: green;
`;

export default Contact;

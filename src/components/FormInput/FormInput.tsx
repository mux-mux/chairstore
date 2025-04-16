import { useId, InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const FormInput = ({ label, ...delegated }: FormInputProps) => {
  const id = useId();

  return (
    <InputContainer>
      <InputField id={id} {...delegated} />
      {label && <InputLabel htmlFor={id}>{label}</InputLabel>}
    </InputContainer>
  );
};

const InputContainer = styled.div`
  position: relative;
  margin: 45px 0;
`;

const InputField = styled.input`
  display: block;
  width: 100%;
  margin: 0 auto;
  background: none;
  background-color: white;
  color: grey;
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid grey;
  margin: 25px 0;

  &:focus {
    outline: none;
  }

  &:focus + label,
  &:not(:placeholder-shown) + label {
    top: -14px;
    font-size: 12px;
    color: black;
    cursor: default;
  }
`;

const InputLabel = styled.label`
  position: absolute;
  top: 10px;
  left: 5px;
  color: grey;
  font-size: 16px;
  font-weight: normal;
  cursor: text;
  will-change: auto;
  transition: 300ms ease all;
`;

export default FormInput;

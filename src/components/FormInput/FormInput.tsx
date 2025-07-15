import { useId } from 'react';
import styled, { css } from 'styled-components';
import { COLORS } from '../../constants';
import type { FormInputProps } from '../../types/form';

const FormInput = ({ label, type = 'text', ...delegated }: FormInputProps) => {
  const id = useId();

  return (
    <InputContainer>
      {type === 'textarea' ? (
        <TextareaField id={id} {...delegated} />
      ) : (
        <InputField id={id} {...delegated} />
      )}
      {label && <InputLabel htmlFor={id}>{label}</InputLabel>}
    </InputContainer>
  );
};

const InputContainer = styled.div`
  position: relative;
  margin: 45px 0;
`;

const Field = css`
  display: block;
  width: 100%;
  margin: 0 auto;
  background: none;
  background-color: transparent;
  color: ${COLORS.textColorPrimary};
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${COLORS.borderSecondary};

  &:focus {
    outline: none;
  }

  &:focus + label,
  &:not(:placeholder-shown) + label {
    top: -14px;
    font-size: 12px;
    color: initial;
    cursor: default;
  }
`;

const InputField = styled.input`
  ${Field}
`;

const TextareaField = styled.textarea`
  ${Field}
  border: 1px solid;
`;

const InputLabel = styled.label`
  position: absolute;
  top: 10px;
  left: 5px;
  color: ${COLORS.textColorPrimary};
  font-size: 16px;
  font-weight: normal;
  cursor: text;

  @media (prefers-reduced-motion: no-preference) {
    will-change: auto;
    transition: 300ms ease all;
  }
`;

export default FormInput;

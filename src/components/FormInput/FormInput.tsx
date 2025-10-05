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
  font-size: 1rem;
  padding: ${({ theme }) => theme.space[2]}px ${({ theme }) => theme.space[3]}px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
  }

  &:focus + label,
  &:not(:placeholder-shown) + label {
    top: -22px;
    font-size: 0.875rem;
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
  top: 6px;
  left: 12px;
  color: ${COLORS.textColorPrimary};
  font-size: 1rem;
  font-weight: normal;
  cursor: text;

  @media (prefers-reduced-motion: no-preference) {
    will-change: auto;
    transition: 300ms ease all;
  }
`;

export default FormInput;

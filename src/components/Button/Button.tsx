import { useMemo, memo } from 'react';
import styled from 'styled-components';
import { SpinnerContainer } from '../Spinner/Spinner';
import type { ButtonVariant, ButtonProps } from '../../types/button';

const getButtonType = (variant: ButtonVariant): React.ElementType => {
  switch (variant) {
    case 'primary':
      return PrimaryButton;
    case 'secondary':
      return SecondaryButton;
    case 'outline':
      return OutlineButton;
    default:
      throw new Error(`Unsupported button variant: ${variant}`);
  }
};

const Button = memo(
  ({
    children,
    variant = 'primary',
    disabled,
    loading = false,
    ...delegated
  }: ButtonProps) => {
    const Component = useMemo(() => getButtonType(variant), [variant]);

    return (
      <Component disabled={disabled || loading} {...delegated}>
        {loading ? <ButtonSpinner /> : children}
      </Component>
    );
  }
);

export default Button;

const ButtonBase = styled.button`
  border-radius: ${({ theme }) => theme.radii.sm};
  border: none;
  padding: ${({ theme }) => theme.space[2]}px ${({ theme }) => theme.space[4]}px;
  font-size: 1rem;
  font-weight: 600;
  font-family: inherit;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const PrimaryButton = styled(ButtonBase)`
  background: ${({ theme }) => theme.colors.primary};
  color: white;

  &:hover:not(:disabled) {
    background: #4338ca;
  }
`;

const SecondaryButton = styled(ButtonBase)`
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.surface};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.surface};
  }
`;

const OutlineButton = styled(ButtonBase)`
  background: transparent;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.surface};
  }
`;

const ButtonSpinner = styled(SpinnerContainer)`
  width: 20px;
  height: 20px;
`;

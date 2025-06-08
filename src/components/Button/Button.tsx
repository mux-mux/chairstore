import { useMemo, memo } from 'react';
import styled from 'styled-components';
import { SpinnerContainer } from '../Spinner/Spinner';
import { COLORS } from '../../constants';

type Variant = 'default' | 'inverted' | 'google';

type ButtonProps = {
  variant?: Variant;
  loading?: boolean;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const getButtonType = (variant: Variant): React.ElementType => {
  switch (variant) {
    case 'default':
      return DefaultButton;
    case 'inverted':
      return InvertedButton;
    case 'google':
      return GoogleButton;
    default:
      throw new Error(`Unsupported button variant: ${variant}`);
  }
};

const Button = memo(
  ({
    children,
    variant = 'default',
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

const ButtonBase = styled.button`
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  text-transform: uppercase;
  cursor: pointer;
  will-change: auto;
  transition: all 0.25s;

  &:focus,
  &:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
`;

const DefaultButton = styled(ButtonBase)`
  background-color: ${COLORS.primary};

  &:hover {
    border-color: ${COLORS.thertiary};
  }
`;

const InvertedButton = styled(ButtonBase)`
  background-color: ${COLORS.secondary};
  color: ${COLORS.primary};
  border: 1px solid ${COLORS.primary};

  &:hover {
    background-color: ${COLORS.primary};
    color: ${COLORS.secondary};
    border-color: ${COLORS.thertiary};
  }
`;

const GoogleButton = styled(ButtonBase)`
  background-color: ${COLORS.thertiary};
  color: ${COLORS.primary};

  &:hover {
    background-color: ${COLORS.thertiary};
    border-color: ${COLORS.primary};
  }
`;

const ButtonSpinner = styled(SpinnerContainer)`
  width: 30px;
  height: 30px;
`;

export default Button;

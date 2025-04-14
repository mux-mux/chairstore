import { ReactNode } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../constants';

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  children: ReactNode;
  variant: string;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'default',
  ...delegated
}) => {
  let Component;
  if (variant === 'default') {
    Component = DefaultButton;
  } else if (variant === 'inverted') {
    Component = InvertedButton;
  } else if (variant === 'google') {
    Component = GoogleButton;
  } else {
    throw new Error(`Unsupported button variant: ${variant}`);
  }

  return <Component {...delegated}>{children}</Component>;
};

const ButtonBase = styled.button`
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.25s;

  &:focus,
  &:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
`;

const DefaultButton = styled(ButtonBase)`
  background-color: ${COLORS.primary};

  &:hover {
    border-color: #646cff;
  }
`;

const InvertedButton = styled(ButtonBase)`
  background-color: ${COLORS.secondary};
  color: ${COLORS.primary};
  border: 1px solid ${COLORS.primary};

  &:hover {
    background-color: ${COLORS.primary};
    color: ${COLORS.secondary};
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

export default Button;

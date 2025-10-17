import { ProductType } from "./product";

export type ButtonVariant = 'primary' | 'secondary' | 'outline';

export type ButtonProps = {
  variant?: ButtonVariant;
  loading?: boolean;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonAddToCartProps = {
  product: ProductType;
  children: React.ReactNode;
};

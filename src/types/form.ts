import { InputHTMLAttributes } from 'react';

export type FormFieldsType = {
  displayName?: string;
  email: string;
  password: string;
};

export type FormInputProps = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

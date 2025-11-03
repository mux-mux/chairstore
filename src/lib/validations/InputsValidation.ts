export const validateField = (name: string, value: string) => {
  switch (name) {
    case 'email':
      if (!value) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return 'Email format: user@example.com';
      return '';
    case 'password':
      if (!value) return 'Password is required';
      if (value.length < 6)
        return 'Password must be at least 6 characters long';
      return '';
    case 'displayName':
      if (!value) return 'Name is required';
      return '';
    case 'message':
      if (!value) return 'Message is required';
      return '';
    default:
      return '';
  }
};

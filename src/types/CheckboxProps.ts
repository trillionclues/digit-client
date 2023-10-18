export type RememberMeCheckboxProps = {
  rememberMe: boolean;
  handleRememberMe: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type PasswordVisibilityToggleProps = {
  passwordVisible: boolean;
  togglePasswordVisibility: () => void;
};

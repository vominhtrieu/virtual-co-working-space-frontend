export interface ChangePasswordFormProps {
  onClose: () => void;
  onSubmit: (values: ChangePasswordFormDataInterface) => void;
}

export interface ChangePasswordInputInterface {
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordFormDataInterface {
  password: string;
  confirmPassword: string;
}

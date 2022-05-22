export interface ChangePasswordFormProps {
  onClose: () => void;
  onSubmit: (values: ChangePasswordFormDataInterface) => void;
}

export interface ChangePasswordInputInterface {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordFormDataInterface {
  oldPassword: string;
  newPassword: string;
}

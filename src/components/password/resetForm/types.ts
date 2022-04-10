export interface InputInterface {
  password: string;
  confirmPassword: string;
}

export interface FormPropsInterface {
  handleResetSubmit: (values: InputFormatInterface) => void;
}

export interface InputFormatInterface {
  password: string;
  confirmPassword: string;
}

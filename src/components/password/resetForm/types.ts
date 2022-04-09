export interface InputInterface {
  password: string;
  passwordConfirm: string;
}

export interface FormPropsInterface {
  handleResetSubmit: (values: InputFormatInterface) => void;
}

export interface InputFormatInterface {
  password: string;
  passwordConfirm: string;
}

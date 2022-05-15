export interface InputInterface {
  email: string;
}

export interface FormPropsInterface {
  handleForgotSubmit: (values: InputFormatInterface) => void;
}

export interface InputFormatInterface {
  email: string;
}

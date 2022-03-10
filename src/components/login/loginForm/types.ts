export interface InputInterface {
  email: string;
  password: string;
}

export interface FormPropsInterface {
  handleLoginSubmit: (values: InputFormatInterface) => void;
}

export interface InputFormatInterface {
  email: string;
  password: string;
}

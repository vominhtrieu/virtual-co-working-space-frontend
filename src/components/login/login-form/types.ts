export interface InputInterface {
  email: string;
  password: string;
}

export interface FormPropsInterface {
  handleLoginSubmit: (values: InputFormatInterface) => void;
  loading: boolean;
}

export interface InputFormatInterface {
  email: string;
  password: string;
}

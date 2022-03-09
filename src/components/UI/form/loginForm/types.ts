export interface InputInterface {
  email: string;
  password: string;
}

export interface FormPropsInterface {
  handleLoginSubmit: (values: InputInterface) => void;
}

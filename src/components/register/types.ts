
export interface InputInterface {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
  }
  
  export interface FormPropsInterface {
    handleRegisterSubmit: (values: InputFormatInterface) => void;
  }
  
  export interface InputFormatInterface {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
  }
  
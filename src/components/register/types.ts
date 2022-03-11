
export interface InputInterface {
    username: string;
    email: string;
    password: string;
  }
  
  export interface FormPropsInterface {
    handleRegisterSubmit: (values: InputFormatInterface) => void;
  }
  
  export interface InputFormatInterface {
    username: string;
    email: string;
    password: string;
  }
  
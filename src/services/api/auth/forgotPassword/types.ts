import { UserInterface } from "./../../../../types/user";

export interface ForgotParamsInterface {
  email: string;
}

export interface ForgotApiResponseInterface {
  msg:string;
  status?: string;
  code?: number;
  message?: string;
  errors?: any[];
}

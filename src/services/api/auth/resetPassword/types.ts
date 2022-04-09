import { UserInterface } from "./../../../../types/user";

export interface ResetParamsInterface {
  token: string;
}

export interface ResetBodyInterface {
  password: string;
  passwordConfirm: string;
}

export interface ResetApiResponseInterface {
  user: UserInterface;
  status?: string;
  code?: number;
  message?: string;
  errors?: any[];
}

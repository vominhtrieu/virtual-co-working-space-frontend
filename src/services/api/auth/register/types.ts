import { UserInterface } from "./../../../../types/user";

export interface RegisterParamsInterface {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface RegisterApiResponseInterface {
  user: UserInterface;
  accessToken: string;
  refreshToken: string;
  status?: string;
  code?: number;
  message?: string;
  errors?: any[];
}

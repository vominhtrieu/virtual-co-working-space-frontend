import { UserInterface } from "../../../../types/user";

export interface RegisterProxyParams {
  name:string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface RegisterProxyTransformInterface {
  user: UserInterface;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterProxyResponseInterface {
  userInfo: UserInterface;
  accessToken: string;
  refreshToken: string;
}

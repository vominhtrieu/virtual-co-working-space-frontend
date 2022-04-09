import { UserInterface } from "../../../../types/user";

export interface ForgotProxyParams {
  email:string;
}

export interface ForgotProxyTransformInterface {
  user: UserInterface;
}

export interface ForgotProxyResponseInterface {
  userInfo: UserInterface;
}

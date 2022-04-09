import { UserInterface } from "../../../../types/user";

export interface ResetProxyParams {
  token:string;
}

export interface ResetProxyBody {
  password: string;
  passwordConfirm: string;
}


export interface ResetProxyTransformInterface {
  user: UserInterface;
}

export interface ResetProxyResponseInterface {
  userInfo: UserInterface;
}

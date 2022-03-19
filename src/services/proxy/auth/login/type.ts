import { UserInterface } from "../../../../types/user";

export interface LoginProxyParams {
  email: string;
  password: string;
}

export interface LoginProxyResponseInterface {
  userInfo: UserInterface;
  accessToken: string;
  refreshToken: string;
}

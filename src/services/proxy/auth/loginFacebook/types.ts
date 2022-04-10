import { UserInterface } from "../../../../types/user";

export interface LoginFacebookProxyTransformInterface {
  user: UserInterface;
  accessToken: string;
  refreshToken: string;
}

export interface LoginFacebookProxyResponseInterface {
  userInfo: UserInterface;
  accessToken: string;
  refreshToken: string;
}

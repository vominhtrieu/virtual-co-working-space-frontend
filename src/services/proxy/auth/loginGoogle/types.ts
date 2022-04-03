import { UserInterface } from "../../../../types/user";

export interface LoginGoogleProxyTransformInterface {
  user: UserInterface;
  accessToken: string;
  refreshToken: string;
}

export interface LoginGoogleProxyResponseInterface {
  userInfo: UserInterface;
  accessToken: string;
  refreshToken: string;
}

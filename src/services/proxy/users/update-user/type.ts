import { UserInterface } from "../../../../types/user";

export interface UpdateProfileProxyParams {
  name: string;
  phone: string;
  avatar: string;
}

export interface UpdateProfileProxyTransformInterface {
  user: UserInterface;
}

export interface UpdateProfileProxyResponseInterface {
  userInfo: UserInterface;
}

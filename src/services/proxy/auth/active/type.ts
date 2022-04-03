import { UserInterface } from "../../../../types/user";

export interface ActiveProxyParams {
  token:string;
}

export interface ActiveProxyTransformInterface {
  user: UserInterface;
}

export interface ActiveProxyResponseInterface {
  userInfo: UserInterface;
}

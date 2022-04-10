import { UserInterface } from "../../../../types/user";

export interface UpdateProfileProxyParams {
  name: string;
  phone: string;
  avatar: string;
}

export interface UpdateProfileProxyTransformInterface {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  provider: "local" | "google" | "facebook";
  externalId?: string;
  status: "active" | "inactive" | "blocked";
  createdAt: string;}

export interface UpdateProfileProxyResponseInterface {
  userInfo: UserInterface;
}

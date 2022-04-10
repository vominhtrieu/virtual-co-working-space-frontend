import { UserInterface } from "./../../../../types/user";

export interface LoginApiResponseInterface {
  user: UserInterface;
  accessToken: string;
  refreshToken: string;
  status?: string;
  code?: number;
  message?: string;
  errors?: any[];
}

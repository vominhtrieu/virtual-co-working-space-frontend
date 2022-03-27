import { UserInterface } from "./../../../../types/user";
export interface UpdateProfileParamsInterface {
  name: string;
  phone: string;
  avatar: string;
}

export interface UpdateProfileApiResponseInterface {
  user: UserInterface;
  status?: string;
  code?: number;
  message?: string;
  errors?: any[];
}

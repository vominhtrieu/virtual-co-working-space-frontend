import { UserInterface } from "./../../../../types/user";
export interface ActiveParamsInterface {
  token: string;
}

export interface ActiveApiResponseInterface {
  user: UserInterface;
  status?: string;
  code?: number;
  message?: string;
  errors?: any[];
}

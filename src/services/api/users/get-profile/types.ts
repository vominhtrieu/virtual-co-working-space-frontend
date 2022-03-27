import { UserInterface } from "../../../../types/user";

export interface UserApiResponseInterface {
    user: UserInterface;
    status?: string;
    code?: number;
    message?: string;
    errors?: any[];
  }
  
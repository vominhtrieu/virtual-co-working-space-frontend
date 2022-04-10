import { UserInterface } from "./../../../../types/user";
export interface UpdateProfileParamsInterface {
  name: string;
  phone: string;
  avatar: string;
}

export interface UpdateProfileApiResponseInterface {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  provider: "local" | "google" | "facebook";
  externalId?: string;
  status: "active" | "inactive" | "blocked";
  createdAt: string;
  code?: number;
  message?: string;
  errors?: any[];
}

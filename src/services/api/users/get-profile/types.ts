export interface UserApiResponseInterface {
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

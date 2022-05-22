
export interface BodyInterface {
  oldPassword: string;
  newPassword: string;
}

export interface ApiResponseInterface {
  msg: string;
  status?: string;
  code?: number;
  message?: string;
  errors?: any[];
}

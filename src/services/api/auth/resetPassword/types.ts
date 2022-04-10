
export interface ResetParamsInterface {
  token: string;
}

export interface ResetBodyInterface {
  password: string;
  confirmPassword: string;
}

export interface ResetApiResponseInterface {
  msg: string;
  status?: string;
  code?: number;
  message?: string;
  errors?: any[];
}

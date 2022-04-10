export interface ActiveParamsInterface {
  token: string;
}

export interface ActiveApiResponseInterface {
  msg: string;
  status?: string;
  code?: number;
  message?: string;
  errors?: any[];
}

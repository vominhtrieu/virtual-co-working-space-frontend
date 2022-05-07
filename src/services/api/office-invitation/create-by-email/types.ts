export interface ParamsInterface {
  email: string;
  officeId: number;
}

export interface ApiResponseInterface {
  status?: string;
  code?: number;
  message?: string;
  errors?: any[];
}
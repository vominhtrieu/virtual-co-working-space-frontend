export interface ParamsInterface {
  id: string;
}

export interface ApiResponseInterface {
  status?: string;
  code?: number;
  message?: string;
  errors?: any[];
}
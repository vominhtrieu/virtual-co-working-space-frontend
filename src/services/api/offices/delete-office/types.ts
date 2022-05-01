export interface OfficeParamsInterface {
  id: number;
}

export interface OfficeApiResponseInterface {
  status?: string;
  code?: number;
  message?: string;
  errors?: any[];
}

import { OfficeInterface } from "../../../../types/office";

export interface OfficeListParamsInterface {
  page?: number;
  size?: number;
}

export interface OfficeListApiResponseInterface {
  offices: OfficeInterface[];
  page: string;
  limit: string;
  total: number;

  status?: string;
  code?: number;
  message?: string;
  errors?: any[];
}

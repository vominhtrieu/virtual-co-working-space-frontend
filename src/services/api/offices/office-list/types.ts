import { OfficeInterface } from "../../../../types/office";

export interface OfficeListParamsInterface {
  page?: number;
  size?: number;
}

export interface OfficeListApiResponseInterface {
  data: {
    offices: OfficeInterface[];
    page: number;
    limit: number;
    total: number;
  };
  status?: string;
  code?: number;
  message?: string;
  errors?: any[];
}

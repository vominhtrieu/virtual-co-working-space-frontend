import { OfficeInterface } from "../../../../types/office";

export interface OfficeListProxyParamsInterface {
  page?: number;
  size?: number;
}

export interface OfficeListProxyResponseInterface {
  officeList: OfficeInterface[];
  page: number;
  limit: number;
  total: number;
}

export interface OfficeListProxyTransformInterface {
  offices: OfficeInterface[];
  page: string;
  limit: string;
  total: number;
}

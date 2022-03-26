import { OfficeInterface } from "../../../../types/office";

export interface OfficeParamsInterface {
  name: string;
}

export interface OfficeApiResponseInterface {
  office: OfficeInterface;
  status?: string;
  code?: number;
  message?: string;
  errors?: any[];
}


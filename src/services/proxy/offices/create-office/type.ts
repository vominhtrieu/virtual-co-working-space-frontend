import { OfficeInterface } from "../../../../types/office";

export interface CreateOfficeProxyParamsInterface {
  name: string;
}
export interface CreateOfficeProxyTransformInterface {
  office: OfficeInterface;
}

export interface CreateOfficeProxyResponseInterface {
  office: OfficeInterface;
}

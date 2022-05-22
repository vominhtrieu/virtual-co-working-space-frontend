import { OfficeInterface } from "../../types/office";

export interface OfficeListInterface {
  offices: OfficeInterface[];
}

export interface CreateOfficeFormValuesInterface {
  name: string;
}

export interface JoinOfficeFormValuesInterface {
  id: string;
}

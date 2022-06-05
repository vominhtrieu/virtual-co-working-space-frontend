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

export interface CreateOfficeFormProps {
  onClose: () => void;
  onSubmit: (values) => void;
}

export interface CreateOfficeFormInputInterface {
  name: string;
}

export interface CreateOfficeFormDataInterface {
  name: string;
}

export interface JoinOfficeFormProps {
  onClose: () => void;
  onSubmit: (values) => void;
}

export interface JoinOfficeFormInputInterface {
  code: string;
}

export interface JoinOfficeFormDataInterface {
  id: string;
}

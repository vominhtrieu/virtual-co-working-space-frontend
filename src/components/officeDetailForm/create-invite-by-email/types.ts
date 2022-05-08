import { OfficeDetailInterface } from "../../../types/office";

export interface FormProps {
  onClose: () => void;
  handleCreate: (office: FormDataInterface) => void;
  officeDetail: OfficeDetailInterface;
}

export interface FormInputInterface {
  email: string;
  officeId:number;
}

export interface FormDataInterface {
  email: string;
  officeId:number;
}

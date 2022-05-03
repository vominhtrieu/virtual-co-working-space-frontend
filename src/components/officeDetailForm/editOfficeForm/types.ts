import { OfficeDetailInterface } from "../../../types/office";

export interface EditOfficeDetailFormProps {
  onClose: () => void;
  onSubmit: (office: EditOfficeDetailFormFormDataInterface) => void;
  officeDetail: OfficeDetailInterface;
}

export interface EditOfficeDetailFormInputInterface {
  name: string;
  avatarUrl:string;
}

export interface EditOfficeDetailFormFormDataInterface {
  name: string;
  avatarUrl:string;
}

export interface EditOfficeDetailFormProps {
  onClose: () => void;
  onSubmit: (office: EditOfficeDetailFormFormDataInterface) => void;
}

export interface EditOfficeDetailFormInputInterface {
  name: string;
}

export interface EditOfficeDetailFormFormDataInterface {
  name: string;
}

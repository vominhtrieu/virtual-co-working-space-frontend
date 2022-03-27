export interface EditProfileFormProps {
  onClose: () => void;
  onSubmit: (values: EditProfileFormDataInterface) => void;
}

export interface EditProfileInputInterface {
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

export interface EditProfileFormDataInterface {
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

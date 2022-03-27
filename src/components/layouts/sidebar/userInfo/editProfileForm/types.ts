export interface EditProfileFormProps {
  onClose: () => void;
  onSubmit: (values: EditProfileFormDataInterface) => void;
}

export interface EditProfileInputInterface {
  name: string;
  phone: string;
  avatar: string;
}

export interface EditProfileFormDataInterface {
  name: string;
  phone: string;
  avatar: string;
}

export interface PopupPropsInterface {
  children: React.ReactNode;
  onClose: () => void;
  onSubmit?: () => void;
  title: string;
}

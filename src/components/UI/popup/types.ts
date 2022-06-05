import { ReactElement } from "react";

export interface PopupPropsInterface {
  children: React.ReactNode;
  onClose: () => void;
  onSubmit?: () => void;
  title: string;
  type: "white" | "dark";
  customButton?: ReactElement;
  hasFooter?:boolean
}

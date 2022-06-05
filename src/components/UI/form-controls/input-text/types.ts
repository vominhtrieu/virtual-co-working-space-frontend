import { InputProps } from "antd";

export interface InputTextProps extends InputProps {
  name: string;
  control?: any;
  ref?: any;
  onFocus?: (e: any) => void;
  label?: string;
  changeCursorPosition?: (e: any) => void;
}

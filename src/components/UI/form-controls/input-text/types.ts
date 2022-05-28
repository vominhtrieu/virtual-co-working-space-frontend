import { InputProps } from "antd";

export interface InputTextProps extends InputProps {
  name: string;
  control: any;
  hasLabel?: boolean;
  ref?: any;
  onFocus?: (e: any) => void;
}

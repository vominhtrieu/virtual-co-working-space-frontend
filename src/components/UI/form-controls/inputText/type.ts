import { SizeType } from "antd/lib/config-provider/SizeContext";
import { ReactNode } from "react";

export interface InputTextProps {
  id?: string;
  name: string;
  control: any;
  required?: boolean;
  prefix?: ReactNode;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  defaultValue?: string;
  maxLength?: number;
  size?: SizeType;
}

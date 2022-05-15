import { DatePickerProps } from "antd";

export type InputDateProps = DatePickerProps & {
  name: string;
  control: any;
  hasLabel?: boolean;
};

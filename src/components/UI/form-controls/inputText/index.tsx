import { Input } from "antd";
import { useController } from "react-hook-form";
import { InputTextProps } from "./type";

const InputText = ({
  type,
  id,
  name,
  control,
  required,
  prefix,
  value,
  defaultValue,
  maxLength,
  size,
}: InputTextProps) => {
  const { field } = useController({ name: name, control: control });
  return (
    <Input
      id={id}
      type={type}
      required={required}
      prefix={prefix}
      onChange={(e) => field.onChange(e.target.value)}
      value={value}
      defaultValue={defaultValue}
      maxLength={maxLength}
      size={size}
    />
  );
};

export default InputText;

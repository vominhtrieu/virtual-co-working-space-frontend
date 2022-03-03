import { Input } from "antd";
import { Controller } from "react-hook-form";
import { InputTextProps } from "./type";

const InputText = ({
  type,
  id,
  name,
  control,
  required,
  prefix,
  onChange,
  value,
  defaultValue,
  maxLength,
  size,
}: InputTextProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={() => (
        <Input
          id={id}
          type={type}
          required={required}
          prefix={prefix}
          onChange={onChange}
          value={value}
          defaultValue={defaultValue}
          maxLength={maxLength}
          size={size}
        />
      )}
    />
  );
};

export default InputText;

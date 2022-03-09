import { Input } from "antd";
import { useController } from "react-hook-form";
import { InputTextProps } from "./type";

const InputText = ({ name, control, hasLabel, ...rest }: InputTextProps) => {
  const { field } = useController({ name: name, control: control });
  const label = rest.placeholder ? rest.placeholder : name;
  return (
    <>
      {hasLabel ? (
        <label htmlFor={name} className='input-label'>
          {label}
        </label>
      ) : null}
      <Input {...rest} id={name} onChange={(e) => field.onChange(e.target.value)} />
    </>
  );
};

export default InputText;

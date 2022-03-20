import { Input } from "antd";
import { useController } from "react-hook-form";
import { InputTextProps } from "./type";

const InputText = ({ name, control, hasLabel, ...rest }: InputTextProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name: name, control: control });
  const label = rest.placeholder ? rest.placeholder : name;
  return (
    <>
      {hasLabel ? (
        <label htmlFor={name} className='input-label'>
          {label}
        </label>
      ) : null}
      <Input
        className={error ? "error" : ""}
        autoComplete='off'
        ref={field.ref}
        onBlur={field.onBlur}
        id={name}
        onChange={(e) => field.onChange(e.target.value)}
        {...rest}
      />
      {error ? <p className='error-message'>{error.message}</p> : null}
    </>
  );
};

export default InputText;

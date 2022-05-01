import { Input } from "antd";
import { useController } from "react-hook-form";
import { InputTextProps } from "./types";

const InputText = ({ name, control, hasLabel, ...rest }: InputTextProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name: name, control: control });

  const label = rest.placeholder ? rest.placeholder : name;

  return (
    <div className='input-text'>
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
        value={field.value}
        id={name}
        onChange={(e) => field.onChange(e.target.value)}
        {...rest}
      />
      {error ? <p className='error-message'>{error.message}</p> : <p className='error-message'></p>}
    </div>
  );
};

export default InputText;

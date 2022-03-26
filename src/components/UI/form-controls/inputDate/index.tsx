import { DatePicker } from "antd";
import { useController } from "react-hook-form";
import { InputDateProps } from "./types";
import moment from "moment";

const InputDate = ({ name, control, hasLabel, ...rest }: InputDateProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name: name, control: control });

  const label = rest.placeholder ? rest.placeholder : name;

  return (
    <div className='date-picker'>
      {hasLabel ? (
        <label htmlFor={name} className='input-date-label'>
          {label}
        </label>
      ) : null}
      <DatePicker
        className={error ? "error" : ""}
        autoComplete='off'
        ref={field.ref}
        onBlur={field.onBlur}
        id={name}
        format='DD/MM/YYYY'
        value={field.value ? moment(field.value, "DD/MM/YYYY") : null}
        placeholder=''
        onChange={(date, dateString) => {
          field.onChange(dateString);
        }}
        {...rest}
      />
      {error ? <p className='error-message'>{error.message}</p> : null}
    </div>
  );
};

export default InputDate;

import { Input } from "antd";
import { forwardRef } from "react";
import { useController } from "react-hook-form";
import { FaPen } from "react-icons/fa";
import { InputTextProps } from "./types";

const InputText = (
  {
    name,
    control,
    onFocus,
    label,
    changeCursorPosition,
    prefix,
    ...rest
  }: InputTextProps,
  ref
) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name: name, control: control });

  return (
    <div className="input-text">
      {label && (
        <label htmlFor={name} className="input-label">
          {label}
        </label>
      )}
      <Input
        className={(error ? "error" : "") + (prefix ? "" : " no-prefix")}
        autoComplete="off"
        ref={ref ?? field.ref}
        onBlur={(e) => {
          changeCursorPosition && changeCursorPosition(e.target.selectionStart);
          field.onBlur();
        }}
        value={field.value}
        id={name}
        onChange={(e) => {
          changeCursorPosition && changeCursorPosition(e.target.selectionStart);
          field.onChange(e.target.value);
        }}
        prefix={prefix ? prefix : <FaPen />}
        {...rest}
        onFocus={onFocus}
      />
      {error && <p className="error-message">{error.message}</p>}
    </div>
  );
};

export default forwardRef(InputText);

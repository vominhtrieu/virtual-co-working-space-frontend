import { Input } from "antd";
import { forwardRef } from "react";
import { useController } from "react-hook-form";
import { InputTextProps } from "./types";

const InputText = (
  {
    name,
    control,
    hasLabel,
    onFocus,
    label,
    changeCursorPosition,
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
      {hasLabel ? (
        <label htmlFor={name} className="input-label">
          {label}
        </label>
      ) : null}
      <Input
        className={error ? "error" : "text"}
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
        {...rest}
        onFocus={onFocus}
      />
      {error && <p className="error-message">{error.message}</p>}
    </div>
  );
};

export default forwardRef(InputText);

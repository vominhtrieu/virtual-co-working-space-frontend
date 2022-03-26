import { ButtonProps } from "./types";

const Button = (props: ButtonProps) => {
  const { children, type, variant, onClick } = props;
  return (
    <button className={`btn btn--${variant}`} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;

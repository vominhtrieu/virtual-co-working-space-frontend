import { NewButtonProps } from "./types";

const NewButton = (props: NewButtonProps) => {
  const { className, type, variant, onClick, disabled, content, icon } = props;
  return (
    <button
      className={`new-btn new-btn--${variant} new-btn--${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {icon}
      <span className="new-btn__content">{content}</span>
    </button>
  );
};

export default NewButton;

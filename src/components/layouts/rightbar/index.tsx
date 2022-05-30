import { FaArrowLeft, FaTimes } from "react-icons/fa";
import { RightBarProps } from "./types";

const RightBar = (props: RightBarProps) => {
  const { isBack, children, onClose, onBack, title } = props;
  return (
    <section className="right-bar">
      <div className="right-bar__header">
        <div className="right-bar__left">
          {isBack && (
            <FaArrowLeft
              className="right-bar__back"
              onClick={() => {
                if (onBack) {
                  onBack();
                }
              }}
            />
          )}
          <div className="right-bar__header-title">{title ?? "Danh sách"}</div>
        </div>
        <FaTimes className="right-bar__close" onClick={onClose} />
      </div>

      <div className="right-bar__content">{children}</div>
    </section>
  );
};

export default RightBar;

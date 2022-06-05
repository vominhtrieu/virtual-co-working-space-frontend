import {
  FaArrowLeft,
  FaEdit,
  FaPlus,
  FaTimes,
  FaUserPlus,
} from "react-icons/fa";
import { RightBarProps } from "./types";

const RightBar = (props: RightBarProps) => {
  const {
    isBack,
    isAdd,
    children,
    onClose,
    onAdd,
    onBack,
    title,
    isEdit,
    isAddMember,
    onAddMember,
    onEdit,
  } = props;
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
          {isAdd && (
            <FaPlus
              className="right-bar__add"
              onClick={() => {
                if (onAdd) {
                  onAdd();
                }
              }}
            />
          )}
          {isEdit && (
            <FaEdit
              className="right-bar__add"
              onClick={() => {
                if (onEdit) {
                  onEdit();
                }
              }}
            />
          )}
          {isAddMember && (
            <FaUserPlus
              className="right-bar__add"
              onClick={() => {
                if (onAddMember) {
                  onAddMember();
                }
              }}
            />
          )}
        </div>
        <FaTimes className="right-bar__close" onClick={onClose} />
      </div>

      <div className="right-bar__content">{children}</div>
    </section>
  );
};

export default RightBar;

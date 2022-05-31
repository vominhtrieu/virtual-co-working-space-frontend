import { PopupPropsInterface } from "./types";
import { FaSave, FaTimes } from "react-icons/fa";
import NewButton from "../new-button";


const Popup = (props: PopupPropsInterface) => {
  const { children, onClose, title, type,onSubmit,hasFooter } = props;
  return (
    <div className='popup'>
      <div className='popup__background' onClick={onClose} />
      <div className={`popup__container-${type}`}>
        <div className={`popup__header-${type}`}>
          <h1 className={`popup__title-${type}`}>{title}</h1>
          <button className={`popup__btn-close-${type}`} onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <div className="popup__content">{children}</div>
        {hasFooter && ( <div className="popup__footer">
          <div className="popup__btn">
            <NewButton
              type="reset"
              variant="secondary"
              onClick={onClose}
              content="Huỷ"
              icon={<FaTimes />}
            />
          </div>

          <div className="popup__btn">
            <NewButton
              type="submit"
              variant="primary"
              content="Lưu"
              onClick={onSubmit}
              icon={<FaSave />}
            />
          </div>

        </div>)}
    
      </div>

    </div>
  );
};

export default Popup;

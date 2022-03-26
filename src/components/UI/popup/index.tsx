import { PopupPropsInterface } from "./types";

const Popup = (props: PopupPropsInterface) => {
  const { children, onClose } = props;
  return (
    <div className='popup'>
      <div className='popup__background' onClick={onClose} />
      <div className='popup__container'>{children}</div>
    </div>
  );
};

export default Popup;

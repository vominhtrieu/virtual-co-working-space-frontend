import { PopupPropsInterface } from "./types";

const Popup = (props: PopupPropsInterface) => {
  const { children } = props;
  return (
    <div className='popup'>
      <div className='popup__background' />
      <div className='popup__container'>{children}</div>
    </div>
  );
};

export default Popup;

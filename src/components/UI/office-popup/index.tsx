import { FaTimes } from 'react-icons/fa'
import { PopupPropsInterface } from './types'

const OfficePopup = (props: PopupPropsInterface) => {
  const { children, onClose, title } = props
  return (
    <div className="office-popup">
      <div className="office-popup__header">
        <h1 className="office-popup__title">{title}</h1>
        <button className="office-popup__btn-close" onClick={onClose}>
          <FaTimes />
        </button>
      </div>
      <div className="popup__content">{children}</div>
    </div>
  )
}

export default OfficePopup

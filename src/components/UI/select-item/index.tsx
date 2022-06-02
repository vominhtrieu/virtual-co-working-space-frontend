import { SelectItemProps } from './types'

const SelectItem = (props: SelectItemProps) => {
  const { isSelected, onClick, content, value, avatar } = props

  const handleClick = () => {
    onClick(value)
  }

  return (
    <div
      className={`select-item ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
    >
      <img
        src={avatar ?? 'https://via.placeholder.com/150'}
        alt=""
        className="select-item__avatar"
      />
      {content}
    </div>
  )
}

export default SelectItem

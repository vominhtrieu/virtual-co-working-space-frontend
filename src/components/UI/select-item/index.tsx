import { SelectItemProps } from "./types";

const SelectItem = (props: SelectItemProps) => {
  const { isSelected, onClick, content, value } = props;

  const handleClick = () => {
    onClick(value);
  };

  return (
    <div
      className={`select-item ${isSelected ? "selected" : ""}`}
      onClick={handleClick}
    >
      {content}
    </div>
  );
};

export default SelectItem;

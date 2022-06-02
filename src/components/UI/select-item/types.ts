export interface SelectItemProps {
  onClick: (id: number) => void;
  isSelected: boolean;
  content: string;
  value: number;
  avatar?: string;
}

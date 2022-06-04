export interface RightBarProps {
  isBack?: boolean;
  isAdd?: boolean;
  children: React.ReactNode;
  onClose: () => void;
  onBack?: () => void;
  onAdd?: () => void;
  title?: string;
  isEdit?: boolean;
  isAddMember?: boolean;
  onEdit?: () => void;
  onAddMember?: () => void;
}

import { OfficeDetailInterface } from "../../office-detail-form/types";

export interface ChatListProps {
  onClose: () => void;
  id: number;
  onSelectConversation: (id: number) => void;
  officeDetail: OfficeDetailInterface;
}

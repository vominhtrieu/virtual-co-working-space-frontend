import { OfficeDetailInterface } from "../../../types/office";

export interface ChatBoxProps {
  onClose: () => void;
  onBack: () => void;
  conversationId: number;
  submitMessage: (message: string) => void;
  officeDetail: OfficeDetailInterface;
}

export interface ChatItemInterface {
  src: string;
  alt: string;
  message: string;
  isMe: boolean;
  id: number;
  conversationId: number;
  reader?: {
    id: number;
    name: string;
    avatar: string;
  }[];
}

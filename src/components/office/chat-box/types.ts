import { OfficeDetailInterface } from "../../../types/office";

export interface ChatBoxProps {
  onClose: () => void;
  onBack: () => void;
  conversationId: number;
  conversationName?: string;
  submitMessage: (message: string, tempId: string) => void;
  officeDetail: OfficeDetailInterface;
}

export interface ChatItemInterface {
  src: string;
  alt: string;
  message: string;
  isMe: boolean;
  id: number;
  tempId?: string;
  conversationId: number;
  senderId: number;
  reader?: {
    id: number;
    name: string;
    avatar: string;
  }[];
}

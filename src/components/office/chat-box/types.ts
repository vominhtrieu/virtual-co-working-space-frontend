export interface ChatBoxProps {
  onClose: () => void;
  onBack: () => void;
  conversationId: number;
  submitMessage: (message: string) => void;
}

export interface ChatItemInterface {
  src: string;
  alt: string;
  message: string;
  isMe: boolean;
  id: number;
  conversationId: number;
}

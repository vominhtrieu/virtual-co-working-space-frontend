export interface ChatBoxPropsInterface {
  conversationId: number;
  submitMessage: (message: string) => void;
}

export interface InputInterface {
  message: string;
}

export interface ChatItemInterface {
  src: string;
  alt: string;
  message: string;
  isMe: boolean;
  id: number;
  conversationId: number;
}

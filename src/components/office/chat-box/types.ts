export interface ChatBoxProps {
  onClose: () => void;
  onBack: () => void;
  conversationId: number;
  submitMessage: (message: string) => void;
}

export interface ChatItemProps {
  avatarUrl?: string;
  name: string;
  lastMess: string;
  conversationId: number;
  isOnline?: boolean;
  onSelectConversation: (id: number) => void;
}

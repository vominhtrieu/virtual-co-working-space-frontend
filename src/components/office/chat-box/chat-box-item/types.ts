export interface ChatBoxItemPropsInterface {
  src?: string;
  alt?: string;
  name?: string;
  message?: string;
  isMe?: boolean;
  id: number;
  senderId: number;
  conversationId: number;
  reader?: {
    id: number;
    name: string;
    avatar: string;
  }[];
}

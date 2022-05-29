export interface GetMessagesProxyParamsInterface {
  id: number;
}
export interface GetMessagesProxyTransformInterface {
  messages: {
    id: number;
    conversationId: number;
    content: string;
    type: string;
    sentAt: string;
    senderId: number;
    readers: {
      readerId: number;
      messageId: number;
      readAt: string;
    }[];
    status: string;
  }[];
  pagination: {
    count: number;
    nextCursor: number;
  };
}

export interface GetMessagesProxyResponseInterface {
  messages: {
    messages: {
      id: number;
      conversationId: number;
      content: string;
      senderId: number;
      readers: {
        readerId: number;
        messageId: number;
        readAt: string;
      }[];
      status: string;
    }[];
    pagination: {
      count: number;
      nextCursor: number;
    };
  };
}

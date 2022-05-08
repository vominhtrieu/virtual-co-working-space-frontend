export interface GetMessagesProxyParamsInterface {
  id: number;
}
export interface GetMessagesProxyTransformInterface {
  messages: {
    messages: {
      id: number;
      conversationId: number;
      content: string;
      type: string;
      sentAt: string;
      sender: {
        id: number;
        name: string;
        avatar?: string;
      };
      reader: {
        readerId: number;
        messageId: number;
        readAt: string;
      };
      status: string;
    }[];
    pagination: {
      count: number;
      nextCursor: number;
    };
  };
}

export interface GetMessagesProxyResponseInterface {
  messages: {
    messages: {
      id: number;
      conversationId: number;
      content: string;
      sender: {
        id: number;
        name: string;
        avatar?: string;
      };
      reader: {
        readerId: number;
        messageId: number;
        readAt: string;
      };
      status: string;
    }[];
    pagination: {
      count: number;
      nextCursor: number;
    };
  };
}

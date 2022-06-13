export interface GetMessagesParamsInterface {
  id: number;
  nextCursor?: number;
  limit?: number;
}

export interface GetMessagesApiResponseInterface {
  data: {
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
  };

  status?: string;
  code?: number;
  message?: string;
  errors?: any[];
}

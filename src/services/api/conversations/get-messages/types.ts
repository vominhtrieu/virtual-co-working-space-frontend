export interface GetMessagesParamsInterface {
  id: number;
}

export interface GetMessagesApiResponseInterface {
  data: {
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
  };
  status?: string;
  code?: number;
  message?: string;
  errors?: any[];
}

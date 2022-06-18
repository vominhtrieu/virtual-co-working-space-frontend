export interface GetConversationsParamsInterface {
  id: number;
}

export interface GetConversationsApiResponseInterface {
  data: {
    conversations: {
      conversation: {
        id: number;
        officeId: number;
        name: string;
        type: string;
        latestMessage: {
          id: number;
          conversationId: number;
          content: string;
          type: "text";
          sentAt: string;
          senderId: number;
          readers: any[];
          reactions: any[];
          status: "sent";
        };
      };

      unreadMessages: number;
      joinedAt: string;
    }[];
  };

  status?: string;
  code?: number;
  message?: string;
  errors?: any[];
}

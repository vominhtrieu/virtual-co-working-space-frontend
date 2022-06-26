export interface GetConversationParamsInterface {
  id: number;
}

export interface GetConversationApiResponseInterface {
  data: {
    conversation: {
      id: number;
      officeId: number;
      name: string;
      description: null;
      type: string;
      members: {
        id: number;
        conversationId: number;
        user: {
          id: number;
          name: string;
          avatar: string;
        };
        joinedAt: string;
      }[];
      creator: {
        id: 13;
        name: string;
        avatar: string;
      };
    };
    unreadMessages: number;
    joinedAt: string;
  };

  status?: string;
  code?: number;
  message?: string;
  errors?: any[];
}

export interface ConversationParamsInterface {
  officeId: number;
}

export interface ConversationApiResponseInterface {
  data: {
    conversation: {
      id: number;
      officeId: number;
      name?: string;
      type: string;
    };
  };
  status?: string;
  code?: number;
  message?: string;
  errors?: any[];
}

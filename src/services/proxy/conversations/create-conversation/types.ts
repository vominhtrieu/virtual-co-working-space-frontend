export interface CreateConversationProxyParamsInterface {
  officeId: number;
}
export interface CreateConversationProxyTransformInterface {
  conversation: {
    id: number;
    officeId: number;
    name?: string;
    type: string;
  };
}

export interface CreateConversationProxyResponseInterface {
  conversation: {
    id: number;
    officeId: number;
    name?: string;
    type: string;
  };
}

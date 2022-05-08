import HttpClient from "../../../../helpers/axios";

import { ConversationParamsInterface, ConversationApiResponseInterface } from "./types";
const URL = "/conversations";

export async function createConversation(params: ConversationParamsInterface) {
  const response = await HttpClient.post<ConversationApiResponseInterface>(
    URL,
    params
  );

  return response.data;
}

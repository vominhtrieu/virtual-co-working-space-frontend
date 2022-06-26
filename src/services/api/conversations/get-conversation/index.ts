import HttpClient from "../../../../helpers/axios";

import {
  GetConversationParamsInterface,
  GetConversationApiResponseInterface,
} from "./types";
const URL = "/conversations/:id";

export async function getConversation(params: GetConversationParamsInterface) {
  const response = await HttpClient.get<GetConversationApiResponseInterface>(
    URL.replace(":id", params.id.toString())
  );

  return response.data;
}

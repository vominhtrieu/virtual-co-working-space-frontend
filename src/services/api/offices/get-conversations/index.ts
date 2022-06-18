import HttpClient from "../../../../helpers/axios";
import {
  GetConversationsApiResponseInterface,
  GetConversationsParamsInterface,
} from "./types";

const URL = "/offices/:id/conversations";

export async function getConversations(
  params: GetConversationsParamsInterface
) {
  const response = await HttpClient.get<GetConversationsApiResponseInterface>(
    URL.replace(":id", params.id.toString())
  );

  return response.data;
}

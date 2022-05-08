import HttpClient from "../../../../helpers/axios";

import {
  GetMessagesParamsInterface,
  GetMessagesApiResponseInterface,
} from "./types";
const URL = "/conversations/:id/recent-messages";

export async function getMessages(params: GetMessagesParamsInterface) {
  const response = await HttpClient.get<GetMessagesApiResponseInterface>(
    URL.replace(":id", params.id.toString()),
    {
      params: params,
    }
  );

  return response.data;
}

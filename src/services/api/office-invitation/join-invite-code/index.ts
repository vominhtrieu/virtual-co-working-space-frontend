import HttpClient from "../../../../helpers/axios";
import {
  ParamsInterface,
  ApiResponseInterface
} from "./types";

const URL1 = "/invites";
const URL2 = "join";

export async function joinByCode(params: ParamsInterface) {
  const response = await HttpClient.post<ApiResponseInterface>(
    `${URL1}/${params.id}/${URL2}`
  );
  return response.data;
}

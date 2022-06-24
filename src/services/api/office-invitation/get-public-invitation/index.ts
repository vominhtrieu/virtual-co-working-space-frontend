import HttpClient from "../../../../helpers/axios";
import {
  ParamsInterface,
  ApiResponseInterface
} from "./types";

const URL = "/invites";

export async function getPublicInvitation(params: ParamsInterface) {
  const response = await HttpClient.get<ApiResponseInterface>(
    `${URL}/${params.id}`
  );
  return response.data;
}

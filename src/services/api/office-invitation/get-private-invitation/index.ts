import HttpClient from "../../../../helpers/axios";
import {
  ParamsInterface,
  ApiResponseInterface
} from "./types";

const URL = "/invites/token";

export async function getPrivateInvitation(params: ParamsInterface) {
  const response = await HttpClient.get<ApiResponseInterface>(
    `${URL}/${params.id}`
  );
  return response.data;
}

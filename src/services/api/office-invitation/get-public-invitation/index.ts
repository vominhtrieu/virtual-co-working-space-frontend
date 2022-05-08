import HttpClient from "../../../../helpers/axios";
import {
  ParamsInterface,
  ApiResponseInterface
} from "./types";

const URL = "/invites";

export async function getPublicInvitation(params: ParamsInterface) {
  console.log(`${URL}/${params.id}`);
  const response = await HttpClient.get<ApiResponseInterface>(
    `${URL}/${params.id}`
  );
  return response.data;
}

import HttpClient from "../../../../helpers/axios";
import { ResetApiResponseInterface, ResetParamsInterface, ResetBodyInterface } from "./types";

const baseUrl = process.env.REACT_APP_BASE_URL;
const URL = baseUrl + "/auth/reset";

export async function reset(params: ResetParamsInterface,body:ResetBodyInterface) {
  const response = await HttpClient.patch<ResetApiResponseInterface>(
    `${URL}/${params.token}`,
    body
  );

  return response.data;
}

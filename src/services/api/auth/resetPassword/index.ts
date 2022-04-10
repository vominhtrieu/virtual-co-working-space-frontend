import HttpClient from "../../../../helpers/axios";
import { ResetApiResponseInterface, ResetParamsInterface, ResetBodyInterface } from "./types";

const baseUrl = process.env.REACT_APP_BASE_URL;
const URL = baseUrl + "/auth/reset";

export async function reset(params: ResetParamsInterface,body:ResetBodyInterface) {
  console.log(`${URL}/${params}`)
  const response = await HttpClient.patch<ResetApiResponseInterface>(
    `${URL}/${params}`,
    body
  );
  return response.data;
}

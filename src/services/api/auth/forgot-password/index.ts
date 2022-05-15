import HttpClient from "../../../../helpers/axios";
import { ForgotApiResponseInterface, ForgotParamsInterface } from "./types";

const baseUrl = process.env.REACT_APP_BASE_URL;
const URL = baseUrl + "/auth/forgot";

export async function forgot(params: ForgotParamsInterface) {
  const response = await HttpClient.post<ForgotApiResponseInterface>(
    URL,
    params
  );

  return response.data;
}

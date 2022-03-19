import HttpClient from "../../../../helpers/axios";
import { LoginApiResponseInterface, LoginParamsInterface } from "./types";

const baseUrl = process.env.REACT_APP_BASE_URL;
const URL = baseUrl + "/auth/login";

export async function login(params: LoginParamsInterface) {
  const response = await HttpClient.post<LoginApiResponseInterface>(
    URL,
    params
  );

  return response.data;
}

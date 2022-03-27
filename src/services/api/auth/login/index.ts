import HttpClient from "../../../../helpers/axios";
import { LoginApiResponseInterface, LoginParamsInterface } from "./types";

const URL = "/auth/login";

export async function login(params: LoginParamsInterface) {
  const response = await HttpClient.post<LoginApiResponseInterface>(
    URL,
    params
  );

  return response.data;
}


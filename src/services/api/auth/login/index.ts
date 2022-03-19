import HttpClient, { ResponseInterface } from "../../../../helpers/axios";
import { LoginParamsInterface, LoginApiResponseInterface } from "./types";

const URL = "/auth/login";

export async function login(params: LoginParamsInterface) {
  const response = await HttpClient.post<
    ResponseInterface<LoginApiResponseInterface>
  >(URL, params);

  return response.data;
}

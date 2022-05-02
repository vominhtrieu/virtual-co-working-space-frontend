import HttpClient from "../../../../helpers/axios";
import { RefreshTokenParamsInterface } from "./types";

const URL = "/auth/refreshToken";

export async function refreshToken() {
  const response = await HttpClient.post<RefreshTokenParamsInterface>(URL);

  return response.data;
}

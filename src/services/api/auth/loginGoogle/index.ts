import HttpClient from "../../../../helpers/axios";
import { LoginApiResponseInterface } from "./types";

const URL = "/auth/google";

export async function loginGoogle() {
  const response = await HttpClient.get<LoginApiResponseInterface>(URL);

  return response.data;
}
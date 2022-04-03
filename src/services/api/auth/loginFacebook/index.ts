import HttpClient from "../../../../helpers/axios";
import { LoginApiResponseInterface } from "./types";

const URL = "/auth/facebook";

export async function loginFacebook() {
  const response = await HttpClient.get<LoginApiResponseInterface>(URL);

  return response.data;
}

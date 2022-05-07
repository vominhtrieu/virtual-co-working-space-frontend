import HttpClient from "../../../../helpers/axios";
import { getData } from "../../../../helpers/cookies";

const URL = "/auth/logout";

const refreshToken = getData("refresh_token");

export async function logout() {
  const response = await HttpClient.get(URL, {
    headers: {
      "x-refresh-token": refreshToken ?? "",
    },
  });

  return response.data;
}

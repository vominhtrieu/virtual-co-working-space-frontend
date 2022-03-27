import HttpClient from "../../../../helpers/axios";
import { getDataLocal } from "../../../../helpers/localStorage";

const URL = "/auth/logout";

const refreshToken = getDataLocal("refresh_token");

export async function logout() {
  const response = await HttpClient.get(URL, {
    headers: {
      "x-refresh-token": refreshToken ?? "",
    },
  });

  return response.data;
}

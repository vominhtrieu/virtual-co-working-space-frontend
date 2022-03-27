import HttpClient from "../../../../helpers/axios";

const URL = "/auth/logout";

export async function logout() {
  const response = await HttpClient.get(URL);

  return response.data;
}

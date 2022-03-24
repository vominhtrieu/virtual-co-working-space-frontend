import HttpClient from "../../../../helpers/axios";

const baseUrl = process.env.REACT_APP_BASE_URL;
const URL = baseUrl + "/auth/logout";

export async function logout() {
  const response = await HttpClient.get(URL);

  return response.data;
}

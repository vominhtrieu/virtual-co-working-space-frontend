import HttpClient from "../../../../helpers/axios";
import { UserApiResponseInterface } from "./types";

const baseUrl = process.env.REACT_APP_BASE_URL;
const URL = baseUrl + "/users/me/profile";

export async function getProfile() {
  const response = await HttpClient.get<UserApiResponseInterface>(URL);

  return response.data;
}

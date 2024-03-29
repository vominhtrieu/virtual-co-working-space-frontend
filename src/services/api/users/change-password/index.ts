import HttpClient from "../../../../helpers/axios";
import { ApiResponseInterface, BodyInterface } from "./types";

const URL ="/auth/change-password";

export async function changePassword(body:BodyInterface) {
  const response = await HttpClient.post<ApiResponseInterface>(
    URL,
    body
  );

  return response.data;
}

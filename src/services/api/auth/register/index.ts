import HttpClient from "../../../../helpers/axios";
import { RegisterApiResponseInterface, RegisterParamsInterface } from "./types";

const baseUrl = process.env.REACT_APP_BASE_URL;
const URL = baseUrl + "/auth/register";

export async function register(params: RegisterParamsInterface) {
  const response = await HttpClient.post<RegisterApiResponseInterface>(
    URL,
    params
  );

  return response.data;
}

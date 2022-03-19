import { getHttpClient } from "../../../../helpers/axios";
import { RegisterParamsInterface } from "./types";

export async function register(params: RegisterParamsInterface) {
  const httpClient = await getHttpClient();
  try {
    const response = httpClient.post("/auth/register", params);
    return response;
  } catch (error) {
    console.log(error);
  }
}

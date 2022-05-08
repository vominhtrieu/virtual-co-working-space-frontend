import HttpClient from "../../../../helpers/axios";
import {
  ParamsInterface,
  ApiResponseInterface
} from "./types";

const URL = "/invites";

export async function createByEmail(params: ParamsInterface) {
  const response = await HttpClient.post<ApiResponseInterface>(
    URL,
    {
      email: params.email,
      officeId: params.officeId,
    }
  );
  return response.data;
}

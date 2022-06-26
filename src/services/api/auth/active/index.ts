import HttpClient from "../../../../helpers/axios";
import { ActiveApiResponseInterface, ActiveParamsInterface } from "./types";
const URL = "/auth/activate";

export async function active(params: ActiveParamsInterface) {
  const response = await HttpClient.get<ActiveApiResponseInterface>(
    `${URL}/${params}`
    );
  return response.data;
}


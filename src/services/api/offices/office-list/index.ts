import HttpClient from "../../../../helpers/axios";
import {
  OfficeListApiResponseInterface,
  OfficeListParamsInterface,
} from "./types";

const URL = "/offices/in-offices";

export async function getOfficeList(params: OfficeListParamsInterface) {
  const response = await HttpClient.get<OfficeListApiResponseInterface>(URL, {
    params: params,
  });

  return response.data;
}

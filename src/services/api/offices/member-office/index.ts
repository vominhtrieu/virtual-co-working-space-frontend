import HttpClient from "../../../../helpers/axios";

import { OfficeParamsInterface, OfficeApiResponseInterface } from "./types";
const URL1 = "/offices";
const URL2 = "members";


export async function memberOffice(params: OfficeParamsInterface) {
  const response = await HttpClient.get<OfficeApiResponseInterface>(
    `${URL1}/${params.id}/${URL2}`
  );

  return response.data;
}

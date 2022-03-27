import HttpClient from "../../../../helpers/axios";

import { OfficeParamsInterface, OfficeApiResponseInterface } from "./types";
const URL = "/offices";

export async function officeDetail(params: OfficeParamsInterface) {
  const response = await HttpClient.get<OfficeApiResponseInterface>(
    `${URL}/${params.id}`
  );

  return response.data;
}

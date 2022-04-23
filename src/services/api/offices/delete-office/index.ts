import HttpClient from "../../../../helpers/axios";
import { OfficeParamsInterface, OfficeApiResponseInterface } from "./types";


const URL = "/offices";

export async function deleteOffice(params: OfficeParamsInterface) {
  const response = await HttpClient.delete<OfficeApiResponseInterface>(
    `${URL}/${params.id}`
  );

  return response.data;
}

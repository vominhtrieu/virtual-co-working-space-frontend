import HttpClient from "../../../../helpers/axios";
import {
  UpdateOfficeApiResponseInterface,
  UpdateOfficeParamsInterface,
} from "./types";

const URL = "/offices";

export async function updateOffice(params: UpdateOfficeParamsInterface) {
  const response = await HttpClient.patch<UpdateOfficeApiResponseInterface>(
    `${URL}/${params.id}`,
    {
      name: params.name,
      avatar: params.avatar,
      description: params.description
    }
  );

  return response.data;
}

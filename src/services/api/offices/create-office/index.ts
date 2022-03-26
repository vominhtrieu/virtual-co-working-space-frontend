import HttpClient from "../../../../helpers/axios";

import { OfficeParamsInterface, OfficeApiResponseInterface } from "./types";
const baseUrl = process.env.REACT_APP_BASE_URL;
const URL = baseUrl + "/users/me/profile";


export async function createOffice(params: OfficeParamsInterface) {
    const response = await HttpClient.post<OfficeApiResponseInterface>(
      URL,
      params
    );
  
    return response.data;
  }
  
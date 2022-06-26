import HttpClient from "../../../../helpers/axios";

import {
  LeaveOfficeParamsInterface,
  LeaveOfficeApiResponseInterface,
} from "./types";
const URL = "/offices/:id/leave";

export async function leaveOffice(params: LeaveOfficeParamsInterface) {
  const response = await HttpClient.delete<LeaveOfficeApiResponseInterface>(
    URL.replace(":id", params.id.toString())
  );

  return response.data;
}

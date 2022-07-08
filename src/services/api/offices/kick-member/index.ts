import HttpClient from "../../../../helpers/axios";

import {
  KickMemberParamsInterface,
  KickMemberApiResponseInterface,
} from "./types";
const URL = "/offices/:id/members/:memberId";

export async function KickMember(params: KickMemberParamsInterface) {
  const response = await HttpClient.delete<KickMemberApiResponseInterface>(
    URL.replace(":id", params.officeId.toString()).replace(
      ":memberId",
      params.memberId.toString()
    )
  );

  return response.data;
}

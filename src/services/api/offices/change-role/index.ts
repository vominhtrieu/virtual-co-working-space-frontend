import HttpClient from "../../../../helpers/axios";

import {
  ChangeRoleParamsInterface,
  ChangeRoleApiResponseInterface,
} from "./types";
const URL = "/offices/:id/members/roles";

export async function ChangeRole(params: ChangeRoleParamsInterface) {
  const response = await HttpClient.post<ChangeRoleApiResponseInterface>(
    URL.replace(":id", params.officeId.toString()),
    {
      officeMemberId: params.memberId,
      officeRoleId: params.roleId,
    }
  );

  return response.data;
}

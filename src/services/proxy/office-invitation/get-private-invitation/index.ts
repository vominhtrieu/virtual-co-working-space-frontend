import { ProxyStatusEnum } from "../../../../types/http/proxy/ProxyStatus";
import { getPrivateInvitation } from "../../../api/office-invitation/get-private-invitation";
import { ProxyFuncType } from "./../../../../types/http/proxy/ProxyFuncType";
import {
  ParamsInterface,
  ProxyResponseInterface,
  ProxyTransformInterface,
} from "./types";

const Transform = (
  res: ProxyTransformInterface
): ProxyResponseInterface => {
  const transform = {
    invitation: {
      id: res?.invitation?.id ?? 0,
      inviter: res?.invitation?.inviter ?? {},
      inviteEmail: res?.invitation?.inviteEmail ?? "",
      token: res?.invitation?.token ?? "",
      office: res?.invitation?.office ?? {},
    }
  };
  return transform;
};

const GetPrivateInvitationProxy = async (
  params: ParamsInterface
): Promise<ProxyFuncType<ProxyResponseInterface>> => {
  const res = await getPrivateInvitation(params);

  if (res?.code && res?.code !== 200) {
    return {
      status: ProxyStatusEnum.FAIL,
      message: res.message,
      code: res.code,
      errors: res.errors,
    };
  }

  const transformed = Transform(res?.data);
  return {
    status: ProxyStatusEnum.SUCCESS,
    data: transformed,
  };
};

export default GetPrivateInvitationProxy;

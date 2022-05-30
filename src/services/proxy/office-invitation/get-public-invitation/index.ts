import { ProxyStatusEnum } from "../../../../types/http/proxy/ProxyStatus";
import { getPublicInvitation } from "../../../api/office-invitation/get-public-invitation";
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
      office: res?.invitation?.office ?? {},
    }
  };
  return transform;
};

const PublicInvitationProxy = async (
  params: ParamsInterface
): Promise<ProxyFuncType<ProxyResponseInterface>> => {
  const res = await getPublicInvitation(params);
  
  
  if (res?.code && res?.code!==200) {
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

export default PublicInvitationProxy;

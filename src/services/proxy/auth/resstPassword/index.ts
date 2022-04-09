import { ProxyFuncType } from "./../../../../types/http/proxy/ProxyFuncType";
import { ProxyStatusEnum } from "../../../../types/http/proxy/ProxyStatus";
import { reset } from "../../../api/auth/resetPassword";
import {
  ResetProxyParams,
  ResetProxyResponseInterface,
  ResetProxyTransformInterface,
  ResetProxyBody,
} from "./type";

const ResetTransform = (
  res: ResetProxyTransformInterface
): ResetProxyResponseInterface => {
  console.log(res);
  const transform = {
    userInfo: {
      id: res?.user.id ?? "",
      email: res?.user.email ?? "",
      name: res?.user.name ?? "",
      phone: res?.user.phone ?? "",
      avatar: res?.user.avatar ?? "",
      provider: res?.user.provider ?? "",
      externalId: res?.user.externalId ?? "",
      status: res?.user.status ?? "",
      createdAt: res?.user.createdAt ?? "",
    },
  };
  return transform;
};

const ResetProxy = async (
  params: ResetProxyParams, body: ResetProxyBody
): Promise<ProxyFuncType<ResetProxyResponseInterface>> => {
  const res = await reset(params, body);

  if (res?.code) {
    return {
      status: ProxyStatusEnum.FAIL,
      message: res.message,
      code: res.code,
      errors: res.errors,
    };
  }

  const ResetRespTransformed = ResetTransform(res);
  return {
    status: ProxyStatusEnum.SUCCESS,
    data: ResetRespTransformed,
  };
};

export default ResetProxy;

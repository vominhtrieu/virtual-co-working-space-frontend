import { ProxyFuncType } from "./../../../../types/http/proxy/ProxyFuncType";
import { ProxyStatusEnum } from "../../../../types/http/proxy/ProxyStatus";
import { forgot } from "../../../api/auth/forgotPassword";
import {
  ForgotProxyParams,
  ForgotProxyResponseInterface,
  ForgotProxyTransformInterface,
} from "./type";

const ForgotTransform = (
  res: ForgotProxyTransformInterface
): ForgotProxyResponseInterface => {
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

const ForgotProxy = async (
  params: ForgotProxyParams
): Promise<ProxyFuncType<ForgotProxyResponseInterface>> => {
  const res = await forgot(params);
  console.log(res);
  if (res?.code) {
    return {
      status: ProxyStatusEnum.FAIL,
      message: res.message,
      code: res.code,
      errors: res.errors,
    };
  }

  const ForgotRespTransformed = ForgotTransform(res);
  return {
    status: ProxyStatusEnum.SUCCESS,
    data: ForgotRespTransformed,
  };
};

export default ForgotProxy;

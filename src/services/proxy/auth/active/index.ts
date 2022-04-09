import { ProxyFuncType } from "./../../../../types/http/proxy/ProxyFuncType";
import { ProxyStatusEnum } from "../../../../types/http/proxy/ProxyStatus";
import { active } from "../../../api/auth/active";
import {
  ActiveProxyParams,
  ActiveProxyResponseInterface,
  ActiveProxyTransformInterface,
} from "./type";

const activeTransform = (
  res: ActiveProxyTransformInterface
): ActiveProxyResponseInterface => {
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

const ActiveProxy = async (
  params: ActiveProxyParams
): Promise<ProxyFuncType<ActiveProxyResponseInterface>> => {
  console.log(params);
  const res = await active(params);
  console.log(res);
  if (res?.code) {
    return {
      status: ProxyStatusEnum.FAIL,
      message: res.message,
      code: res.code,
      errors: res.errors,
    };
  }

  const activeRespTransformed = activeTransform(res);
  return {
    status: ProxyStatusEnum.SUCCESS,
    data: activeRespTransformed,
  };
};

export default ActiveProxy;

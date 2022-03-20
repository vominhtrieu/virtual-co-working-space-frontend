import { ProxyFuncType } from "./../../../../types/http/proxy/ProxyFuncType";
import { ProxyStatusEnum } from "../../../../types/http/proxy/ProxyStatus";
import { register } from "../../../api/auth/register";
import {
  RegisterProxyParams,
  RegisterProxyResponseInterface,
  RegisterProxyTransformInterface,
} from "./type";

const registerTransform = (
  res: RegisterProxyTransformInterface
): RegisterProxyResponseInterface => {
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

const RegisterProxy = async (
  params: RegisterProxyParams
): Promise<ProxyFuncType<RegisterProxyResponseInterface>> => {
  const res = await register(params);

  if (res?.code) {
    return {
      status: ProxyStatusEnum.FAIL,
      message: res.message,
      code: res.code,
      errors: res.errors,
    };
  }

  const registerRespTransformed = registerTransform(res);
  return {
    status: ProxyStatusEnum.SUCCESS,
    data: registerRespTransformed,
  };
};

export default RegisterProxy;

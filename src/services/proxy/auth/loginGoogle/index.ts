import { ProxyStatusEnum } from "../../../../types/http/proxy/ProxyStatus";
import { loginGoogle } from "../../../api/auth/loginGoogle";
import { ProxyFuncType } from "./../../../../types/http/proxy/ProxyFuncType";
import {
  LoginGoogleProxyResponseInterface,
  LoginGoogleProxyTransformInterface,
} from "./types";

const loginTransform = (
  res: LoginGoogleProxyTransformInterface
): LoginGoogleProxyResponseInterface => {
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
    accessToken: res?.accessToken ?? "",
    refreshToken: res?.refreshToken ?? "",
  };
  return transform;
};

const LoginGoogleProxy = async (): Promise<
  ProxyFuncType<LoginGoogleProxyResponseInterface>
> => {
  const res = await loginGoogle();

  if (res?.code && res?.code !==200) {
    return {
      status: ProxyStatusEnum.FAIL,
      message: res.message,
      code: res.code,
      errors: res.errors,
    };
  }

  const loginRespTransformed = loginTransform(res.data);
  return {
    status: ProxyStatusEnum.SUCCESS,
    data: loginRespTransformed,
  };
};

export default LoginGoogleProxy;

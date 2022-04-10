import { ProxyStatusEnum } from "../../../../types/http/proxy/ProxyStatus";
import { loginFacebook } from "../../../api/auth/loginFacebook";
import { ProxyFuncType } from "./../../../../types/http/proxy/ProxyFuncType";
import {
  LoginFacebookProxyResponseInterface,
  LoginFacebookProxyTransformInterface,
} from "./types";

const loginTransform = (
  res: LoginFacebookProxyTransformInterface
): LoginFacebookProxyResponseInterface => {
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

const LoginFacebookProxy = async (): Promise<
  ProxyFuncType<LoginFacebookProxyResponseInterface>
> => {
  const res = await loginFacebook();

  if (res?.code) {
    return {
      status: ProxyStatusEnum.FAIL,
      message: res.message,
      code: res.code,
      errors: res.errors,
    };
  }

  const loginRespTransformed = loginTransform(res);
  return {
    status: ProxyStatusEnum.SUCCESS,
    data: loginRespTransformed,
  };
};

export default LoginFacebookProxy;
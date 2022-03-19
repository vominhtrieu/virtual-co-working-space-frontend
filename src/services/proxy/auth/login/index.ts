import { ProxyFuncType } from "./../../../../types/http/proxy/ProxyFuncType";
import { ProxyStatusEnum } from "../../../../types/http/proxy/ProxyStatus";
import { login } from "../../../api/auth/login";
import { LoginProxyParams, LoginProxyResponseInterface } from "./type";

const loginTransform = (res: any): LoginProxyResponseInterface => {
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
      createAt: res?.user.createAt ?? "",
    },
    accessToken: res?.accessToken ?? "",
    refreshToken: res?.refreshToken ?? "",
  };
  return transform;
};

const LoginProxy = async (
  params: LoginProxyParams
): Promise<ProxyFuncType<LoginProxyResponseInterface>> => {
  const res = await login(params);

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

export default LoginProxy;

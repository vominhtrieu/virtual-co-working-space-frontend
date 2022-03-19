import { ProxyFuncType } from "./../../../../types/http/proxy/ProxyFuncType";
import { ProxyStatusEnum } from "../../../../types/http/proxy/ProxyStatus";
import { login } from "../../../api/auth/login";
import { LoginProxyParams, LoginProxyResponseInterface } from "./type";

const loginTransform = (res: any): LoginProxyResponseInterface => {
  const transform = {
    userInfo: {
      id: res.id ?? "",
      email: res.email ?? "",
      name: res.name ?? "",
      phone: res.phone ?? "",
      avatar: res.avatar ?? "",
      provider: res.provider ?? "",
      externalId: res.externalId ?? "",
      status: res.status ?? "",
      createAt: res.createAt ?? "",
    },
    accessToken: res.accessToken ?? "",
    refreshToken: res.refreshToken ?? "",
  };
  return transform;
};

const LoginProxy = async (
  params: LoginProxyParams
): Promise<ProxyFuncType<LoginProxyResponseInterface>> => {
  const res = await login(params);

  if (res.data?.code) {
    return {
      status: ProxyStatusEnum.FAIL,
      message: res.data.message,
      code: res.data.code,
      errors: res.data.errors,
    };
  }

  const loginRespTransformed = loginTransform(res.data?.user);
  return {
    status: ProxyStatusEnum.SUCCESS,
    data: loginRespTransformed,
  };
};

export default LoginProxy;

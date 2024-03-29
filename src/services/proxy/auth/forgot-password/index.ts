import { ProxyFuncType } from "../../../../types/http/proxy/ProxyFuncType";
import { ProxyStatusEnum } from "../../../../types/http/proxy/ProxyStatus";
import { forgot } from "../../../api/auth/forgot-password";
import {
  ForgotProxyParams,
  ForgotProxyResponseInterface,
  ForgotProxyTransformInterface,
} from "./type";

const ForgotTransform = (
  res: ForgotProxyTransformInterface
): ForgotProxyResponseInterface => {
  const transform = {
    msg: res?.msg??"",
  };
  return transform;
};

const ForgotProxy = async (
  params: ForgotProxyParams
): Promise<ProxyFuncType<ForgotProxyResponseInterface>> => {

  const res = await forgot(params);
  console.log(res);
  if (res?.code && res?.code !==200) {
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

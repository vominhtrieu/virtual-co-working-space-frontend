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
  const transform = {
    msg: res?.msg??"",
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

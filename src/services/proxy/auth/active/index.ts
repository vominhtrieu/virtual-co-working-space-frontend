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
    msg: res?.msg??"",
  };
  return transform;
};

const ActiveProxy = async (
  params: ActiveProxyParams
): Promise<ProxyFuncType<ActiveProxyResponseInterface>> => {

  const res = await active(params);

  if (res?.code && res?.code !==200) {
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

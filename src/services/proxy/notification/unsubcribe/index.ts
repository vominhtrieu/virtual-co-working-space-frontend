import { ProxyStatusEnum } from "../../../../types/http/proxy/ProxyStatus";
import { subscribe } from "../../../api/notification/subscribe";
import { unsubscribe } from "../../../api/notification/unsubcribe";
import { ProxyFuncType } from "./../../../../types/http/proxy/ProxyFuncType";
import {
  ApiResponseInterface,
  ProxyBodyInterface,
  ProxyTransformInterface,
} from "./types";

const UnsubcribeTransform = (
  res: ProxyTransformInterface
): ApiResponseInterface => {
  const transform = {
    pushToken: res?.pushToken
  };
  return transform;
};

const UnsubcribeProxy = async (
  params: ProxyBodyInterface
): Promise<ProxyFuncType<ApiResponseInterface>> => {
  const res = await unsubscribe(params);
  
  if (res?.code && res?.code !== 200) {
    return {
      status: ProxyStatusEnum.FAIL,
      message: res.message,
      code: res.code,
      errors: res.errors,
    };
  }

  const officeListRespTransformed = UnsubcribeTransform(res?.data);
  return {
    status: ProxyStatusEnum.SUCCESS,
    data: officeListRespTransformed,
  };
};

export default UnsubcribeProxy;

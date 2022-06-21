import { ProxyStatusEnum } from "../../../../types/http/proxy/ProxyStatus";
import { subscribe } from "../../../api/notification/subscribe";
import { ProxyFuncType } from "./../../../../types/http/proxy/ProxyFuncType";
import {
  ApiResponseInterface,
  ProxyBodyInterface,
  ProxyTransformInterface,
} from "./types";

const SubcribeTransform = (
  res: ProxyTransformInterface
): ApiResponseInterface => {
  const transform = {
    pushToken: res?.pushToken
  };
  return transform;
};

const SubcribeProxy = async (
  params: ProxyBodyInterface
): Promise<ProxyFuncType<ApiResponseInterface>> => {
  const res = await subscribe(params);
  
  if (res?.code && res?.code !== 200) {
    return {
      status: ProxyStatusEnum.FAIL,
      message: res.message,
      code: res.code,
      errors: res.errors,
    };
  }

  const officeListRespTransformed = SubcribeTransform(res?.data);
  return {
    status: ProxyStatusEnum.SUCCESS,
    data: officeListRespTransformed,
  };
};

export default SubcribeProxy;

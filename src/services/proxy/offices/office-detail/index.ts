import { ProxyStatusEnum } from "../../../../types/http/proxy/ProxyStatus";
import { officeDetail } from "../../../api/offices/office-detail";
import { ProxyFuncType } from "./../../../../types/http/proxy/ProxyFuncType";
import {
  OfficeDetailProxyParamsInterface,
  OfficeDetailProxyResponseInterface,
  OfficeDetailProxyTransformInterface,
} from "./types";

const officeDetailTransform = (
  res: OfficeDetailProxyTransformInterface
): OfficeDetailProxyResponseInterface => {
  const transform = {
    office: res?.office ?? {},
  };
  return transform;
};

const OfficeDetailProxy = async (
  params: OfficeDetailProxyParamsInterface
): Promise<ProxyFuncType<OfficeDetailProxyResponseInterface>> => {
  const res = await officeDetail(params);

  if (res?.code && res?.code!==200) {
    return {
      status: ProxyStatusEnum.FAIL,
      message: res.message,
      code: res.code,
      errors: res.errors,
    };
  }

  const officeListRespTransformed = officeDetailTransform(res?.data);
  return {
    status: ProxyStatusEnum.SUCCESS,
    data: officeListRespTransformed,
  };
};

export default OfficeDetailProxy;

import { ProxyStatusEnum } from "../../../../types/http/proxy/ProxyStatus";
import { officeDetail } from "../../../api/offices/office-detail";
import { ProxyFuncType } from "./../../../../types/http/proxy/ProxyFuncType";
import {
  UpdateOfficeProxyParamsInterface,
  UpdateOfficeProxyResponseInterface,
  UpdateOfficeProxyTransformInterface,
} from "./types";

const officeDetailTransform = (
  res: UpdateOfficeProxyTransformInterface
): UpdateOfficeProxyResponseInterface => {
  const transform = {
    office: res?.office ?? {},
  };
  return transform;
};

const UpdateOfficeProxy = async (
  params: UpdateOfficeProxyParamsInterface
): Promise<ProxyFuncType<UpdateOfficeProxyResponseInterface>> => {
  const res = await officeDetail(params);

  if (res?.code) {
    return {
      status: ProxyStatusEnum.FAIL,
      message: res.message,
      code: res.code,
      errors: res.errors,
    };
  }

  const officeListRespTransformed = officeDetailTransform(res);
  return {
    status: ProxyStatusEnum.SUCCESS,
    data: officeListRespTransformed,
  };
};

export default UpdateOfficeProxy;

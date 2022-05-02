import { ProxyStatusEnum } from "../../../../types/http/proxy/ProxyStatus";
import { updateOffice } from "../../../api/offices/update-office";
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
  const res = await updateOffice(params);

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

export default UpdateOfficeProxy;

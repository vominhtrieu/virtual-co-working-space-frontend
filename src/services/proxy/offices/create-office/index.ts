import { ProxyStatusEnum } from "../../../../types/http/proxy/ProxyStatus";
import { createOffice } from "../../../api/offices/create-office";
import { ProxyFuncType } from "./../../../../types/http/proxy/ProxyFuncType";
import {
  CreateOfficeProxyParamsInterface,
  CreateOfficeProxyResponseInterface,
  CreateOfficeProxyTransformInterface,
} from "./type";

const createOfficeTransform = (
  res: CreateOfficeProxyTransformInterface
): CreateOfficeProxyResponseInterface => {
  const transform = {
    office: res?.office ?? {},
  };
  return transform;
};

const CreateOfficeProxy = async (
  params: CreateOfficeProxyParamsInterface
): Promise<ProxyFuncType<CreateOfficeProxyResponseInterface>> => {
  const res = await createOffice(params);

  if (res?.code && res?.code!==200) {
    return {
      status: ProxyStatusEnum.FAIL,
      message: res.message,
      code: res.code,
      errors: res.errors,
    };
  }

  const officeListRespTransformed = createOfficeTransform(res);
  return {
    status: ProxyStatusEnum.SUCCESS,
    data: officeListRespTransformed,
  };
};

export default CreateOfficeProxy;

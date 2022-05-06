import { ProxyFuncType } from "./../../../../types/http/proxy/ProxyFuncType";
import { ProxyStatusEnum } from "../../../../types/http/proxy/ProxyStatus";

import { getOfficeList } from "../../../api/offices/office-list";
import {
  OfficeListProxyParamsInterface,
  OfficeListProxyResponseInterface,
  OfficeListProxyTransformInterface,
} from "./types";

const officeListTransform = (
  res: OfficeListProxyTransformInterface
): OfficeListProxyResponseInterface => {
  const transform = {
    officeList: res?.offices ?? [],
    page: res?.page ? +res.page : 0,
    limit: res?.limit ? +res.limit : 0,
    total: res?.total ?? 0,
  };
  return transform;
};

const GetOfficeListProxy = async (
  params: OfficeListProxyParamsInterface
): Promise<ProxyFuncType<OfficeListProxyResponseInterface>> => {
  const res = await getOfficeList(params);

  console.log(res);
  

  if (res?.code && res.code !== 200) {
    return {
      status: ProxyStatusEnum.FAIL,
      message: res.message,
      code: res.code,
      errors: res.errors,
    };
  }

  const officeListRespTransformed = officeListTransform(res?.data);
  return {
    status: ProxyStatusEnum.SUCCESS,
    data: officeListRespTransformed,
  };
};

export default GetOfficeListProxy;

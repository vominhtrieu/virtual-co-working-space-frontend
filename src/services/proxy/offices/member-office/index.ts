import { ProxyStatusEnum } from "../../../../types/http/proxy/ProxyStatus";
import { memberOffice } from "../../../api/offices/member-office";
import { ProxyFuncType } from "./../../../../types/http/proxy/ProxyFuncType";
import {
  MemberOfficeProxyParamsInterface,
  MemberOfficeProxyResponseInterface,
  MemberOfficeProxyTransformInterface,
} from "./types";

const MemberOfficeTransform = (
  res: MemberOfficeProxyTransformInterface
): MemberOfficeProxyResponseInterface => {
  const transform = {
    data: res?.data ??{},
  };
  return transform;
};

const MemberOfficeProxy = async (
  params: MemberOfficeProxyParamsInterface
): Promise<ProxyFuncType<MemberOfficeProxyResponseInterface>> => {
  const res = await memberOffice(params);

  if (res?.code) {
    return {
      status: ProxyStatusEnum.FAIL,
      message: res.message,
      code: res.code,
      errors: res.errors,
    };
  }

  const officeListRespTransformed = MemberOfficeTransform(res);
  return {
    status: ProxyStatusEnum.SUCCESS,
    data: officeListRespTransformed,
  };
};

export default MemberOfficeProxy;

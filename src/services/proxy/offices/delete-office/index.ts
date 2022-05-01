import { ProxyStatusEnum } from "../../../../types/http/proxy/ProxyStatus";
import { deleteOffice } from "../../../api/offices/delete-office";
import { ProxyFuncType } from "./../../../../types/http/proxy/ProxyFuncType";
import {
  DeleteOfficeApiResponseInterface,
  DeleteOfficeProxyParamsInterface,
  DeleteOfficeProxyTransformInterface,
} from "./types";

const DeleteOfficeTransform = (
  res: DeleteOfficeProxyTransformInterface
): DeleteOfficeApiResponseInterface => {
  const transform = {
    status: res?.status ?? "",
    code: res?.code??0,
    message: res?.message??"",
    error: res?.errors??[],
  };
  return transform;
};

const DeleteOfficeProxy = async (
  params: DeleteOfficeProxyParamsInterface
): Promise<ProxyFuncType<DeleteOfficeApiResponseInterface>> => {
  const res = await deleteOffice(params);
  console.log(res);
  if (res?.code && res?.code !== 200) {
    return {
      status: ProxyStatusEnum.FAIL,
      message: res.message,
      code: res.code,
      errors: res.errors,
    };
  }

  const officeListRespTransformed = DeleteOfficeTransform(res);
  return {
    status: ProxyStatusEnum.SUCCESS,
    data: officeListRespTransformed,
  };
};

export default DeleteOfficeProxy;

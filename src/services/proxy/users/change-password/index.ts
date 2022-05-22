import { ProxyFuncType } from "../../../../types/http/proxy/ProxyFuncType";
import { ProxyStatusEnum } from "../../../../types/http/proxy/ProxyStatus";
import { changePassword } from "../../../api/users/change-password";
import {
  ProxyResponseInterface,
  ProxyTransformInterface,
  ProxyBody,
} from "./type";

const Transform = (
  res: ProxyTransformInterface
): ProxyResponseInterface => {
  const transform = {
    msg: res?.msg??"",
  };
  return transform;
};

const ChangePasswordProxy = async ( body: ProxyBody
): Promise<ProxyFuncType<ProxyResponseInterface>> => {
  const res = await changePassword(body);
  if (res?.code && res?.code !==200) {
    return {
      status: ProxyStatusEnum.FAIL,
      message: res.message,
      code: res.code,
      errors: res.errors,
    };
  }

  const respTransformed = Transform(res);
  return {
    status: ProxyStatusEnum.SUCCESS,
    data: respTransformed,
  };
};

export default ChangePasswordProxy;

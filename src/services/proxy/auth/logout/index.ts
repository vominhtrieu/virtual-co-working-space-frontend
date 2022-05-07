import { ProxyStatusEnum } from "../../../../types/http/proxy/ProxyStatus";
import { logout } from "../../../api/auth/logout";
import { ProxyFuncType } from "./../../../../types/http/proxy/ProxyFuncType";

const LogoutProxy = async (): Promise<ProxyFuncType> => {
  const res = await logout();

  if (res?.code && res?.code !==200) {
    return {
      status: ProxyStatusEnum.FAIL,
      message: res.message,
      code: res.code,
      errors: res.errors,
    };
  }

  return {
    status: ProxyStatusEnum.SUCCESS,
    data: res,
  };
};

export default LogoutProxy;

import { ProxyStatusEnum } from "../../../../types/http/proxy/ProxyStatus";
import { ProxyFuncType } from "./../../../../types/http/proxy/ProxyFuncType";
import { joinByCode } from "../../../api/office-invitation/join-invite-code";
import { ParamsInterface } from "./types";

const JoinByCodeProxy =async (
  params: ParamsInterface
): Promise<ProxyFuncType>  => {
  const res = await joinByCode(params);
  console.log("join by code");
  
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

export default JoinByCodeProxy;

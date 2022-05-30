import { ProxyStatusEnum } from "../../../../types/http/proxy/ProxyStatus";
import { ProxyFuncType } from "./../../../../types/http/proxy/ProxyFuncType";
import { ParamsInterface } from "./types";
import { accepPrivateInvitation } from "../../../api/office-invitation/accept-private-invitation";

const AcceptPrivateInvitation =async (
  params: ParamsInterface
): Promise<ProxyFuncType>  => {
  const res = await accepPrivateInvitation(params);
  
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

export default AcceptPrivateInvitation;

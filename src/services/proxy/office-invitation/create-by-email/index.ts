import { ProxyStatusEnum } from "../../../../types/http/proxy/ProxyStatus";
import { createByEmail } from "../../../api/office-invitation/create-by-email";
import { ProxyFuncType } from "./../../../../types/http/proxy/ProxyFuncType";
import { ParamsInterface } from "./types";

const CreateByEmailProxy =async (
  params: ParamsInterface
): Promise<ProxyFuncType>  => {
  const res = await createByEmail(params);

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

export default CreateByEmailProxy;

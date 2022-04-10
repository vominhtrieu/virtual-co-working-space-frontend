import { ProxyFuncType } from "./../../../../types/http/proxy/ProxyFuncType";
import { ProxyStatusEnum } from "../../../../types/http/proxy/ProxyStatus";
import { updateProfile } from "../../../api/users/update-profile";
import {
  UpdateProfileProxyParams,
  UpdateProfileProxyTransformInterface,
  UpdateProfileProxyResponseInterface,
} from "./type";

const updateProfileTransform = (
  res: UpdateProfileProxyTransformInterface
): UpdateProfileProxyResponseInterface => {
  const transform = {
    userInfo: {
      id: res?.id ?? "",
      email: res?.email ?? "",
      name: res?.name ?? "",
      phone: res?.phone ?? "",
      avatar: res?.avatar ?? "",
      provider: res?.provider ?? "",
      externalId: res?.externalId ?? "",
      status: res?.status ?? "",
      createdAt: res?.createdAt ?? "",
    },
  };
  return transform;
};

const UpdateProfileProxy = async (
    params: UpdateProfileProxyParams
  ): Promise<ProxyFuncType<UpdateProfileProxyResponseInterface>> =>  {
  const res = await updateProfile(params);

  if (res?.code) {
    return {
      status: ProxyStatusEnum.FAIL,
      message: res.message,
      code: res.code,
      errors: res.errors,
    };
  }

  const profileRespTransformed = updateProfileTransform(res);
  return {
    status: ProxyStatusEnum.SUCCESS,
    data: profileRespTransformed,
  };
};

export default UpdateProfileProxy;

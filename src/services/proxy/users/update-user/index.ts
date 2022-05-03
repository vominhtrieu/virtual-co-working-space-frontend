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
      id: res?.user?.id ?? "",
      email: res?.user?.email ?? "",
      name: res?.user?.name ?? "",
      phone: res?.user?.phone ?? "",
      avatar: res?.user?.avatar ?? "",
      provider: res?.user?.provider ?? "",
      externalId: res?.user?.externalId ?? "",
      status: res?.user?.status ?? "",
      createdAt: res?.user?.createdAt ?? "",
    },
  };
  return transform;
};

const UpdateProfileProxy = async (
    params: UpdateProfileProxyParams
  ): Promise<ProxyFuncType<UpdateProfileProxyResponseInterface>> =>  {
  const res = await updateProfile(params);

  if (res?.code && res?.code!== 200) {
    return {
      status: ProxyStatusEnum.FAIL,
      message: res.message,
      code: res.code,
      errors: res.errors,
    };
  }

  const profileRespTransformed = updateProfileTransform(res?.data);
  return {
    status: ProxyStatusEnum.SUCCESS,
    data: profileRespTransformed,
  };
};

export default UpdateProfileProxy;

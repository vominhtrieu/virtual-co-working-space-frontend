import { ProxyStatusEnum } from "../../../../types/http/proxy/ProxyStatus";
import { ProxyFuncType } from "../../../../types/http/proxy/ProxyFuncType";
import { getProfile } from "../../../api/users/get-profile";
import {
  ProfileProxyResponseInterface, ProfileProxyTransformInterface
} from "./type";

const profileTransform = (
  res: ProfileProxyTransformInterface
): ProfileProxyResponseInterface => {
  const transform = {
    userInfo: {
      id: res?.user.id ?? "",
      email: res?.user.email ?? "",
      name: res?.user.name ?? "",
      phone: res?.user.phone ?? "",
      avatar: res?.user.avatar ?? "",
      provider: res?.user.provider ?? "",
      externalId: res?.user.externalId ?? "",
      status: res?.user.status ?? "",
      createdAt: res?.user.createdAt ?? "",
    },
  };
  return transform;
};

const ProfileProxy = async (): Promise<ProxyFuncType<ProfileProxyResponseInterface>> => {
  const res = await getProfile();

  if (res?.code) {
    return {
      status: ProxyStatusEnum.FAIL,
      message: res.message,
      code: res.code,
      errors: res.errors,
    };
  }

  const profileRespTransformed = profileTransform(res);
  return {
    status: ProxyStatusEnum.SUCCESS,
    data: profileRespTransformed,
  };
};

export default ProfileProxy;

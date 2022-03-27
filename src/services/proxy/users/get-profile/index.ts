import { ProxyStatusEnum } from "../../../../types/http/proxy/ProxyStatus";
import { ProxyFuncType } from "../../../../types/http/proxy/ProxyFuncType";
import { getProfile } from "../../../api/users/get-profile";
import {
  ProfileProxyResponseInterface,
  ProfileProxyTransformInterface,
} from "./type";

const profileTransform = (
  res: ProfileProxyTransformInterface
): ProfileProxyResponseInterface => {
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

const ProfileProxy = async (): Promise<
  ProxyFuncType<ProfileProxyResponseInterface>
> => {
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

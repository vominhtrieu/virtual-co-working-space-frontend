import { register } from "../../../api/auth/register";
import { RegisterProxyParamsInterface } from "./types";

const registerTransform = (res: any) => {
  const transform = {
    userInfo: {
      id: res.id,
      name: res.name,
      email: res.email,
      phone: res.phone,
    },
    chatInfo: {
      id: res.chatId ?? "",
      name: res.chatName,
      avatar: res.chatAvatar,
      content: res.message,
    },
  };
  return transform;
};

const RegisterProxy = async (params: RegisterProxyParamsInterface) => {
  const res = await register(params);
  console.log(res);

  if (res?.status !== 200) {
    return {
      status: res?.status,
      message: res?.statusText,
    };
  }

  const getBuEfCusStatisticTransform = registerTransform(res.data);

  return {
    status: res.status,
    payload: getBuEfCusStatisticTransform,
  };
};

export default RegisterProxy;

import { login } from "../../../api/auth/login/login";

const loginTransform = (res: any) => {
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

const LoginProxy = async () => {
  const res = await login("a", "a");

  if (res.status !== 200) {
    return {
      status: res.status,
      message: res.statusText,
    };
  }

  const getBuEfCusStatisticTransform = loginTransform(res.data.message);

  return {
    status: res.status,
    payload: getBuEfCusStatisticTransform,
  };
};

export default LoginProxy;

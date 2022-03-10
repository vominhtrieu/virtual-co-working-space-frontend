import { login } from "../../api/auth/login";

const loginTransform = (res: any) => {
  const transform = res;
  return transform;
};

const LoginProxy = async () => {
  const res = await login({ email: "a", password: "a" });

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

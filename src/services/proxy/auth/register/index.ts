
import { register } from "../../../api/auth/register";
import { RegisterProxyParams } from "./type";

const RegisterProxy = async (params: RegisterProxyParams) => {
  const res = await register(params);

  if (res.status !== 200) {
    return {
      status: res.status,
      message: res.statusText,
    };
  }

  return {
    status: res.status,
  };
};



// export const fetchAsyncGetUserItems = createAsyncThunk(
//   "qiita/getUserItems",
//   async (userName: string) => {
//     const { data } = await axios.get<Item[]>(
//       `https://qiita.com/api/v2/users/${userName}/items`
//     );
//     return data;
//   }
// );

export default RegisterProxy;
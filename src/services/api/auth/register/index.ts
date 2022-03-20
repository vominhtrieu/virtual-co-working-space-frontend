import axios from "axios";
import { RegisterParamsInterface } from "./type";

export async function register(params: RegisterParamsInterface) {
  const response = await axios.post("/api/auth/register", params);

  return response;
}

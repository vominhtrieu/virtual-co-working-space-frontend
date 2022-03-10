import axios from "axios";
import { LoginParamsInterface } from "./type";

export async function login(params: LoginParamsInterface) {
  const response = await axios.post("/api/auth/login", params);

  return response;
}

import axios from "axios";

import MockAdapter from "axios-mock-adapter";
import { loginRes } from "@/services/mocks/auth/login";

const mock = new MockAdapter(axios);

mock.onPost("/api/auth/login").reply(200, {
  message: loginRes.message,
});

export async function login(email: string, password: string) {
  const response = await axios.post("/api/auth/login");

  return response;
}

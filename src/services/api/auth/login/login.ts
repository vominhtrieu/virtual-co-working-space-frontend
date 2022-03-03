import axios from "axios";


export async function login(email: string, password: string) {
  const response = await axios.post("/api/auth/login");

  return response;
}

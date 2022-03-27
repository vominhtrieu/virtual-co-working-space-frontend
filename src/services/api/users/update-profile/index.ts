import HttpClient from "../../../../helpers/axios";
import { UpdateProfileApiResponseInterface, UpdateProfileParamsInterface } from "./types";

const URL = "/users/me/profile";

export async function updateProfile(params: UpdateProfileParamsInterface) {
  const response = await HttpClient.patch<UpdateProfileApiResponseInterface>(
    URL,
    params
  );

  return response.data;
}


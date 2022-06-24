import HttpClient from "../../../../helpers/axios";
import type { ApiResponseInterface,BodyInterface } from "./types";

const URL ="/notifications/subscribe";

export async function subscribe(body: BodyInterface) {
    const response = await HttpClient.post<ApiResponseInterface>(URL, body);
    return response.data;
}
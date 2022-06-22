import HttpClient from "../../../../helpers/axios";
import type { ApiResponseInterface,BodyInterface } from "./types";

const URL ="/notifications/unsubscribe";

export async function unsubscribe(body: BodyInterface) {
    const response = await HttpClient.post<ApiResponseInterface>(URL, body);
    return response.data;
}
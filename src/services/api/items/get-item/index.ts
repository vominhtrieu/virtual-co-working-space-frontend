import HttpClient from "../../../../helpers/axios";
import type { GetItemApiResponseInterface, ItemParamsInterface } from "./types";

const URL ="admin/items";

export async function getItem(params: ItemParamsInterface) {
    const response = await HttpClient.get<GetItemApiResponseInterface>( `${URL}/${params.id}`);
    return response.data;
}
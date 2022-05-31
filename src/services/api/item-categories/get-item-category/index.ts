import HttpClient from "../../../../helpers/axios";
import type { GetItemApiResponseInterface, ItemParamsInterface } from "./types";

const URL ="admin/item-categories";

export async function getCategory(params: ItemParamsInterface) {
    const response = await HttpClient.get<GetItemApiResponseInterface>( `${URL}/${params.id}`);
    return response.data;
}
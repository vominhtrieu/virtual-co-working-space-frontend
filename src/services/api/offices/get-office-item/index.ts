import HttpClient from "../../../../helpers/axios";

import {ItemApiResponseInterface} from "./types";

const URL = "/items";

export async function getItems(categoryId: number) {
    const response = await HttpClient.get<ItemApiResponseInterface>(`${URL}?category_id=${categoryId}`);

    return response.data;
}
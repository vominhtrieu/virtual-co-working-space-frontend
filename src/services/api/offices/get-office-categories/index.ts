import HttpClient from "../../../../helpers/axios";

import {ItemCategoryApiResponseInterface} from "./types";

const URL = "/item-categories";

export async function getItemCategories() {
    const response = await HttpClient.get<ItemCategoryApiResponseInterface>(URL);

    return response.data;
}
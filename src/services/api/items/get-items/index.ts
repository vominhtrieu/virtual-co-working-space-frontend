import HttpClient from "../../../../helpers/axios";
import type { GetItemApiResponseInterface, ItemListParamsInterface } from "./types";


const URL = "/items";

export async function getItemList(params: ItemListParamsInterface) {
    const response = await HttpClient.get<GetItemApiResponseInterface>(URL, {
      params: params,
    });
    return response.data;
  }
  
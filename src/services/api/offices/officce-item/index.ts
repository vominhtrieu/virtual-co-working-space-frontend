import { GetOfficeItemResponseInterface } from './types';
import HttpClient from "../../../../helpers/axios"

const URL = "/office-items"

export async function getOfficeItems() {
    const response = await HttpClient.get<GetOfficeItemResponseInterface>(
        URL,
        {
            params: {
                page: 1,
                size: 2
            }
        })
    
    return response.data;
}
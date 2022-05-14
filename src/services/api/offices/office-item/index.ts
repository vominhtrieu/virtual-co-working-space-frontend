import HttpClient from "../../../../helpers/axios";

import {OfficeItemApiResponseInterface} from "./types";

const URL = "/office-items";

export async function getOfficeItems() {
    const response = await HttpClient.get<OfficeItemApiResponseInterface>(URL);

    return response.data;
}

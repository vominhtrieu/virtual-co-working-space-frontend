import {UpdateAppearanceApiResponse, CharacterInterfaceItem} from "./types";
import HttpClient from "../../../../helpers/axios";
import {CharacterInterface} from "../../../../types/character";

const URL = "/appearances";

export async function updateAppearance(body: CharacterInterface) {
    const data: CharacterInterfaceItem[] = [];

    for (const key in body) {
        if (typeof body[key] === "number") {
            data.push({
                key: key,
                value: body[key],
            });
        }
    }
    const response = await HttpClient.post<UpdateAppearanceApiResponse>(
        URL,
        {
            appearances: data
        }
    );

    return response.data;
}

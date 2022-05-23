import {UpdateAppearanceApiResponse, CharacterAppearanceItem} from "./types";
import HttpClient from "../../../../helpers/axios";
import {CharacterAppearance} from "../../../../types/character";

const URL = "/appearances";

export async function updateAppearance(body: CharacterAppearance) {
    const data: CharacterAppearanceItem[] = [];

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

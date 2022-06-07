import { CharacterAppearance } from './../../../../types/character';
import { Appearance, GetAppearanceResponse, MemberAppearance } from './types';
import HttpClient from "../../../../helpers/axios"

const URL = "/offices"

export async function getMemberAppearances(officeId: number): Promise<MemberAppearance[]> {
    const response = await HttpClient.get<GetAppearanceResponse>(
        `${URL}/${officeId}/appearances`
    )

    if (response.status !== 200) {
        return {} as MemberAppearance[];
    }

    const defaultAppearance: CharacterAppearance = {
        hairColor: 0,
        hairStyle: 0,
        shoeColor: 0,
        shirtColor: 0,
        pantColor: 0,
        skinColor: 0,
        eyeStyle: 0
    }
    const returnData = [] as MemberAppearance[];
    response.data.data.appearances.reduce((acc, curr) => {
        const idx = returnData.findIndex((value) => value.userId === acc.userId)
        if (idx >= 0) {
            returnData[idx].appearance[acc.key] = acc.value
        } else {
            const memberAppearance: MemberAppearance = {
                userId: acc.userId,
                appearance: defaultAppearance
            }
            memberAppearance.appearance[acc.key] = acc.value;
            returnData.push(memberAppearance);
        }

        return curr;
    })

    return returnData;
}
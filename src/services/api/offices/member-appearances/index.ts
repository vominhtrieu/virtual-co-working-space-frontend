import { GetAppearanceResponse, MemberAppearance } from './types';
import HttpClient from "../../../../helpers/axios"

const URL = "/offices"

export async function getMemberAppearances(officeId: number): Promise<MemberAppearance[]> {
    const response = await HttpClient.get<GetAppearanceResponse>(
        `${URL}/${officeId}/appearances`
    )

    if (response.status !== 200) {
        return {} as MemberAppearance[];
    }

    const returnData = [] as MemberAppearance[];

    response.data.data.appearances.forEach((appearance) => {
        const idx = returnData.findIndex((value) => value.userId === appearance.userId);
        if (idx >= 0) {
            returnData[idx].appearance[appearance.key] = appearance.value
        } else {
            const memberAppearance: MemberAppearance = {
                userId: appearance.userId,
                appearance: {
                    hairColor: 0,
                    hairStyle: 0,
                    shoeColor: 0,
                    shirtColor: 0,
                    pantColor: 0,
                    skinColor: 0,
                    eyeStyle: 0
                }
            }
            memberAppearance.appearance[appearance.key] = appearance.value;
            returnData.push(memberAppearance);
        }
    })

    return returnData;
}
import { CharacterAppearance } from './../../../../types/character';
export interface Appearance {
    id: number,
    key: string,
    userId: number,
    value: number,
    createdAt: number,
    updatedAt: number
}

export interface MemberAppearance {
    userId: number;
    appearance: CharacterAppearance
}

export interface GetAppearanceResponse {
    data: {
        appearances: Appearance[],
    },
    status?: string,
    code?: number,
    message?: string,
    error?: any[]
}
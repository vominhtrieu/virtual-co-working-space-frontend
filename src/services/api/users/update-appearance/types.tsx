export interface CharacterAppearanceItem {
    key: string;
    value: number;
}

export interface UpdateAppearanceApiResponse {
    data: any;
    code?: number;
    message?: string;
    errors?: any[];
}
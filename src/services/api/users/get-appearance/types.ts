export interface CharacterAppearanceResponse {
    data: {
        appearances: {
            key: string,
            value: number
        }[];
    };
    code?: number;
    message?: string;
    errors?: any[];
}

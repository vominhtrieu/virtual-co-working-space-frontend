export interface CharacterInterfaceResponse {
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

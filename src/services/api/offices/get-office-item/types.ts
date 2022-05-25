export interface Item {
    id: number;
    name: string;
    modelPath: string;
}
export interface ItemApiResponseInterface {
    data: any;
    status?: string;
    code?: number;
    message?: string;
    errors?: any[];
}

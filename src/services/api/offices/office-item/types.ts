export interface OfficeItem {
    id: string;
    name: string;
    modelPath: string;
}

export interface OfficeItemApiResponseInterface {
    data: any;
    status?: string;
    code?: number;
    message?: string;
    errors?: any[];
}

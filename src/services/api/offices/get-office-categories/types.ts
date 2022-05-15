export interface ItemCategory {
    id: number;
    name: string;
    modelPath: string;
}

export interface ItemCategoryApiResponseInterface {
    data: {
        itemCategories: ItemCategory[],
    };
    status?: string;
    code?: number;
    message?: string;
    errors?: any[];
}

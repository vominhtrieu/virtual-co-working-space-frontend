export interface ItemCategoryInterface {
    id: number;
    name: string;
    description: string;
    creator:CreatorInterface;
    createdAt:string;
};

export interface CreatorInterface {
    id: number;
    name: string;
    avatar: string;
}
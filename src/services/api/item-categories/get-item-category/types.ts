import { ItemCategoryInterface } from "../../../../types/item-category";

export interface ItemParamsInterface {
  id: number;
}

export interface GetItemApiResponseInterface {
    data: {
      itemCategory: ItemCategoryInterface;
    };
    code?: number;
    message?: string;
    errors?: string[];
    status?: string;
  }
  
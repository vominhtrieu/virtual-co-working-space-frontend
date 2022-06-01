import { ItemCategoryInterface } from "../../../../types/item-category";
import { PaginationInterface } from "../../../../types/Pagination";

export interface GetItemApiResponseInterface {
  data: {
    itemCategories: ItemCategoryInterface[];
    pagination: PaginationInterface;
  };
  code?: number;
  message?: string;
  errors?: string[];
  status?: string;
}

export interface ItemListParamsInterface {
  page?: number;
  limit?: number;
}
import { ItemCategoryInterface } from "../../../../types/item-category";
import { PaginationInterface } from "../../../../types/Pagination";

export interface ProxyTransformInterface {
  itemCategories: ItemCategoryInterface[];
  pagination: PaginationInterface;
}

export interface ProxyResponseInterface {
  itemCategories: ItemCategoryInterface[];
  pagination: PaginationInterface
}
export interface ParamsInterface {
  page?: number;
  limit?: number;
}


import { ItemInterface } from "../../../../types/item";
import { PaginationInterface } from "../../../../types/Pagination";

export interface ItemListProxyTransformInterface {
  data: {
    items: ItemInterface[];
    pagination: {
      count: number;
      page: number;
      totalCount: number;
    };
  };
}

export interface ItemListProxyResponseInterface {
  items: ItemInterface[];
  pagination: PaginationInterface
}
export interface ItemListParamsInterface {
  page?: number;
  limit?: number;
  "name[contains]"?: string;
  "path[startsWith]"?: string;
  "name[startsWith]"?: string;
  category_id?:string;
  sort_by?:string;
}
import type { ItemInterface } from "../../../../types/item";

export interface GetItemApiResponseInterface {
  data: {
    items: ItemInterface[];
    pagination: {
      count: number;
      page: number;
      totalCount: number;
    };
  };
  code?: number;
  message?: string;
  errors?: string[];
  status?: string;
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
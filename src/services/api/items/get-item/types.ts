import { ItemInterface } from "../../../../types/item";

export interface ItemParamsInterface {
  id: number;
}

export interface GetItemApiResponseInterface {
    data: {
      items: ItemInterface;
    };
    code?: number;
    message?: string;
    errors?: string[];
    status?: string;
  }
  
  
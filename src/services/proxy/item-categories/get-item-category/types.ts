import { ItemCategoryInterface } from "../../../../types/item-category";

export interface ParamsInterface {
  id: number;
}

export interface ProxyTransformInterface {
    itemCategory: ItemCategoryInterface;
}

export interface ProxyResponseInterface {
  itemCategory: ItemCategoryInterface;
}

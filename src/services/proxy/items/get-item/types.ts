import { ItemInterface } from "../../../../types/item";

export interface ItemParamsInterface {
  id: number;
}

export interface GetItemProxyTransformInterface {
  data: {
    items: ItemInterface;
  };
}

export interface GetItemProxyResponseInterface {
  data: {
    items: ItemInterface;
  };
}

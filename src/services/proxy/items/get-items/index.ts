import type { ProxyFuncType } from '../../../../types/http/proxy/ProxyFuncType';
import { ProxyStatusEnum } from '../../../../types/http/proxy/ProxyStatus';
import { ItemListProxyResponseInterface, ItemListProxyTransformInterface, ItemListParamsInterface } from './types';
import { getItemList } from '../../../api/items/get-items';
const ItemListTransform = (
  res: ItemListProxyTransformInterface,
): ItemListProxyResponseInterface => {
  const transform = {
      items: res.data?.items,
      pagination: res?.data.pagination,
  };

  return transform;
};

const ItemListProxy = async (params:ItemListParamsInterface): Promise<ProxyFuncType<ItemListProxyResponseInterface>> => {
  const res = await getItemList(params);

  if (res?.code && res.code !== 200) {
    return {
      status: ProxyStatusEnum.FAIL,
      message: res.message,
      code: res.code,
      errors: res.errors,
    };
  }

  const itemListRespTransformed = ItemListTransform(res);
  return {
    status: ProxyStatusEnum.SUCCESS,
    data: itemListRespTransformed,
  };
};

export default ItemListProxy;


import { getItem } from '../../../api/items/get-item';
import type { ProxyFuncType } from '../../../../types/http/proxy/ProxyFuncType';
import { ProxyStatusEnum } from '../../../../types/http/proxy/ProxyStatus';
import type { 
  GetItemProxyResponseInterface, 
  GetItemProxyTransformInterface,
  ItemParamsInterface
 } from './types';

const GetItemTransform = (
  res: GetItemProxyTransformInterface,
): GetItemProxyResponseInterface => {
  const transform = {
    data: res.data
  };
  return transform;
};

const GetItemProxy = async (params:ItemParamsInterface): Promise<ProxyFuncType<GetItemProxyResponseInterface>> => {
  const res = await getItem(params);

  if (res?.code && res.code !== 200) {
    return {
      status: ProxyStatusEnum.FAIL,
      message: res.message,
      code: res.code,
      errors: res.errors,
    };
  }

  const GetItemRespTransformed = GetItemTransform(res);
  return {
    status: ProxyStatusEnum.SUCCESS,
    data: GetItemRespTransformed,
  };
};

export default GetItemProxy;

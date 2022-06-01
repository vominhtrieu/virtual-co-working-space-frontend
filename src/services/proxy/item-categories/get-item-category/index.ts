import type { ProxyFuncType } from '../../../../types/http/proxy/ProxyFuncType';
import { ProxyStatusEnum } from '../../../../types/http/proxy/ProxyStatus';
import type { ProxyResponseInterface, ProxyTransformInterface, ParamsInterface } from './types';
import { getCategory } from '../../../api/item-categories/get-item-category';
const Transform = (
  res: ProxyTransformInterface,
): ProxyResponseInterface => {
  const transform = {
    itemCategory: res.itemCategory
  };

  return transform;
};

const GetCategoryProxy = async (params: ParamsInterface): Promise<ProxyFuncType<ProxyResponseInterface>> => {
  const res = await getCategory(params);

  if (res?.code && res?.code !== 200) {
    return {
      status: ProxyStatusEnum.FAIL,
      message: res.message,
      code: res.code,
      errors: res.errors,
    };
  }

  const respTransformed = Transform(res?.data);
  return {
    status: ProxyStatusEnum.SUCCESS,
    data: respTransformed ,
  };
};

export default GetCategoryProxy;

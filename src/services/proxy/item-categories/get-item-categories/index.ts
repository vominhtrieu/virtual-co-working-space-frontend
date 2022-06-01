import type { ProxyFuncType } from '../../../../types/http/proxy/ProxyFuncType';
import { ProxyStatusEnum } from '../../../../types/http/proxy/ProxyStatus';
import type { ProxyResponseInterface, ProxyTransformInterface,ParamsInterface } from './types';
import { getCategoryList } from '../../../api/item-categories/get-item-categories';

const Transform = (
  res: ProxyTransformInterface,
): ProxyResponseInterface => {
  const transform = {
    itemCategories: res?.itemCategories,
    pagination: res?.pagination,
  };

  return transform;
};

const CategoryListProxy = async (params: ParamsInterface): Promise<ProxyFuncType<ProxyResponseInterface>> => {
  const res = await getCategoryList(params);

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

export default CategoryListProxy;

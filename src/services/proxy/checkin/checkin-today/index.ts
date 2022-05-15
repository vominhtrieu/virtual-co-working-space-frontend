import { ProxyFuncType } from '../../../../types/http/proxy/ProxyFuncType';
import { ProxyStatusEnum } from '../../../../types/http/proxy/ProxyStatus';
import { isCheckinToday } from '../../../api/checkin/checkin-today';
import { IsCheckinTodayParamsProxy, IsCheckinTodayResponseProxy } from './types';

const IsCheckinProxy = async (params: IsCheckinTodayParamsProxy): Promise<ProxyFuncType<IsCheckinTodayResponseProxy>> => {
    const res = await isCheckinToday(params);

    if (res?.code && res?.code!== 200) {
        return {
          status: ProxyStatusEnum.FAIL,
          message: res.message,
          code: res.code,
          errors: res.errors,
        };
    }

    return {
        status: ProxyStatusEnum.SUCCESS,
        data: res.data
    }
}

export default IsCheckinProxy;
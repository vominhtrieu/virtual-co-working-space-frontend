import { ProxyStatusEnum } from '../../../../types/http/proxy/ProxyStatus';
import { createCheckin } from '../../../api/checkin/create-checkin';
import { CreateCheckinParamsProxy } from './types';

const CreateCheckinProxy = async (params: CreateCheckinParamsProxy) => {
    const res = await createCheckin(params);

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
        data: res.data,
    }
}

export default CreateCheckinProxy;
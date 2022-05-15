import { ProxyStatusEnum } from '../../../../types/http/proxy/ProxyStatus';
import { uploadProofPhoto } from '../../../api/checkin/upload-proof';
import { ProxyFuncType } from './../../../../types/http/proxy/ProxyFuncType';
import { UploadProofProxyParams, UploadProofProxyResponse } from './types';

const UploadProofProxy = async (params: UploadProofProxyParams): Promise<ProxyFuncType<UploadProofProxyResponse>> => {
    const res = await uploadProofPhoto(params);

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

export default UploadProofProxy;
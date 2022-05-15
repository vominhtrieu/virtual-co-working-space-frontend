import HttpClient from '../../../../helpers/axios';
import { UploadProofParamsInterface, UploadProofResponseInterface } from './types';

const URL = "/uploads/image"

export async function uploadProofPhoto(params: UploadProofParamsInterface) {
    const config = {
        headers: { 'content-type': 'multipart/form-data' }
    }

    const response = await HttpClient.post<UploadProofResponseInterface>(
        URL,
        params.formData,
        config
    );

    return response.data
}
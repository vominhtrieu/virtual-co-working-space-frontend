import HttpClient from '../../../../helpers/axios';
import { CreateCheckinParamsInterface, CreateCheckinResponseInterface } from './types';
const URL = "/checkin";

export async function createCheckin(params: CreateCheckinParamsInterface) {
    const response = await HttpClient.post<CreateCheckinResponseInterface>(
        URL,
        params
    );

    return response.data;
}
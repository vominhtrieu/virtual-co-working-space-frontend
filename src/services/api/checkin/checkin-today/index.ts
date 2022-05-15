import HttpClient from '../../../../helpers/axios';
import { IsCheckinTodayParamsInterface, IsCheckinTodayResponseInterface } from './types';

const URL = "/checkin"

export async function isCheckinToday(params: IsCheckinTodayParamsInterface) {
    const response = await HttpClient.get<IsCheckinTodayResponseInterface>(
        URL,
        {
            params: params
        }
    );

    return response.data;
}
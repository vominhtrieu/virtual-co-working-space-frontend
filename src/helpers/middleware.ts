import HttpClient from "./axios";
import axios from "axios";
import { setIsLoad } from "../stores/load-slice";
import { getDataLocal, saveDataLocal } from './localStorage'

export const HTTP_HEADER_KEY = {
    CONTENT_TYPE: 'Content-Type',
    MODE: 'mode',
    AUTHORIZATION: 'Authorization',
}

export const HTTP_HEADER_VALUE = {
    APPLICATION_JSON: 'application/json',
    CORS: 'cors',
}

export interface ResponseInterface<T = any> {
    data?: T
}

const SetupInterceptors = (store) => {
    HttpClient.interceptors.request.use(
        function (config) {
            store.dispatch(setIsLoad(true));
            const accessToken = getDataLocal('access_token')
            if (accessToken)
                config.headers = {
                    ...config.headers,
                    [HTTP_HEADER_KEY.AUTHORIZATION]: 'Bearer ' + accessToken,
                }
            return config
        },
        function (error) {
            store.dispatch(setIsLoad(false));
            return Promise.reject(error)
        },
    )

    HttpClient.interceptors.response.use(async (response) => {
        if (response.data.code === 401) {
            console.log("code");
            const refreshTokenResponse = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/refreshToken`, null, {
                headers: { "x-refresh-token": `${getDataLocal("refresh_token")}` }
            });

            if (!refreshTokenResponse || !refreshTokenResponse.data || refreshTokenResponse.data.code === 401) {
                return refreshTokenResponse.data;
            }
            if (refreshTokenResponse.data.data.accessToken) {
                const accessToken = refreshTokenResponse.data.data.accessToken;
                await saveDataLocal("access_token", accessToken);
                const config = response.config;
                if (accessToken)
                    config.headers = {
                        ...config.headers,
                        [HTTP_HEADER_KEY.AUTHORIZATION]: 'Bearer ' + accessToken,
                    }
                store.dispatch(setIsLoad(false));
                return HttpClient(config);
            }
        }
        store.dispatch(setIsLoad(false));
        return response;
    }, error => {
        console.warn('Error status', error.response.status)
        // return Promise.reject(error)
        if (error.response) {
            store.dispatch(setIsLoad(false));
            return error.response.data
        } else {
            store.dispatch(setIsLoad(false));
            return Promise.reject(error)
        }
    })

}
export default SetupInterceptors;
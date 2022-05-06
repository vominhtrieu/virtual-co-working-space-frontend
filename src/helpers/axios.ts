import axios from 'axios'
import { getDataLocal, saveDataLocal } from './localStorage'

console.log(process.env.REACT_APP_BASE_URL)

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

const HttpClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 3000,
  headers: {
    [HTTP_HEADER_KEY.CONTENT_TYPE]: HTTP_HEADER_VALUE.APPLICATION_JSON,
    [HTTP_HEADER_KEY.MODE]: HTTP_HEADER_VALUE.CORS,
  },
})


HttpClient.interceptors.request.use(
  function (config) {
    const accessToken = getDataLocal('access_token')
    if (accessToken)
      config.headers = {
        ...config.headers,
        [HTTP_HEADER_KEY.AUTHORIZATION]: 'Bearer ' + accessToken,
      }
    return config
  },
  function (error) {
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
        return HttpClient(config);
    }
  }
  return response;

}, error => {
  console.warn('Error status', error.response.status)
  // return Promise.reject(error)
  if (error.response) {
    return error.response.data
  } else {
    return Promise.reject(error)
  }
})

export default HttpClient

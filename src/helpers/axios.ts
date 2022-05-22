import axios from 'axios'

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

export default HttpClient

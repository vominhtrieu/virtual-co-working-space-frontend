import axios from "axios";

const axiosConfig: any = {
  timeOut: 3000,
};

export const HTTP_HEADER_KEY = {
  CONTENT_TYPE: "Content-Type",
  MODE: "mode",
};

export const HTTP_HEADER_VALUE = {
  APPLICATION_JSON: "application/json",
  CORS: "cors"
};

export interface ResponseInterface<T = any> {
  data?: T;
}

const HttpClient = axios.create({
  //@ts-ignore
  axiosConfig,
  headers: {
    [HTTP_HEADER_KEY.CONTENT_TYPE]: HTTP_HEADER_VALUE.APPLICATION_JSON,
    [HTTP_HEADER_KEY.MODE]: HTTP_HEADER_VALUE.CORS

  },
});

export default HttpClient;

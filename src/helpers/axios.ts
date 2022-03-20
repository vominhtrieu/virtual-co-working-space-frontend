import axios from "axios";

const axiosConfig: any = {
  timeOut: 3000,
};

export const HTTP_HEADER_KEY = {
  CONTENT_TYPE: "Content-Type",
};

export const HTTP_HEADER_VALUE = {
  APPLICATION_JSON: "application/json",
};

export interface ResponseInterface<T = any> {
  data?: T;
}

const HttpClient = axios.create({
  //@ts-ignore
  axiosConfig,
  headers: {
    [HTTP_HEADER_KEY.CONTENT_TYPE]: HTTP_HEADER_VALUE.APPLICATION_JSON,
  },
});

export default HttpClient;

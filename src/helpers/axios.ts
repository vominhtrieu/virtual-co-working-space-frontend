import axios from "axios";

const accessToken=localStorage.getItem("access_token");
console.log(accessToken);

const axiosConfig: any = {
  timeOut: 3000,
};

export const HTTP_HEADER_KEY = {
  CONTENT_TYPE: "Content-Type",
  AUTHORIZATION: "Authorization"
};

export const HTTP_HEADER_VALUE = {
  APPLICATION_JSON: "application/json",
  BEARTOKEN: accessToken?"Bearer " + accessToken:"",
};

export interface ResponseInterface<T = any> {
  data?: T;
}

const HttpClient = axios.create({
  //@ts-ignore
  axiosConfig,
  headers: {
    [HTTP_HEADER_KEY.CONTENT_TYPE]: HTTP_HEADER_VALUE.APPLICATION_JSON,
    [HTTP_HEADER_KEY.AUTHORIZATION]: HTTP_HEADER_VALUE.BEARTOKEN,
  },
});

export default HttpClient;

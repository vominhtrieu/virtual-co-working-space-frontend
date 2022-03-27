import axios from "axios";
import { getDataLocal } from "./localStorage";

const accessToken = getDataLocal("access_token");

export const HTTP_HEADER_KEY = {
  CONTENT_TYPE: "Content-Type",
  AUTHORIZATION: "Authorization",
};

export const HTTP_HEADER_VALUE = {
  APPLICATION_JSON: "application/json",
  BEARTOKEN: accessToken ? "Bearer " + accessToken : "",
};

export interface ResponseInterface<T = any> {
  data?: T;
}

console.log(HTTP_HEADER_KEY.CONTENT_TYPE, HTTP_HEADER_VALUE.BEARTOKEN);

const HttpClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 3000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    [HTTP_HEADER_KEY.AUTHORIZATION]: HTTP_HEADER_VALUE.BEARTOKEN,
  },
});

export default HttpClient;

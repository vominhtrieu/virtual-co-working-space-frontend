import axios from "axios";
import { getDataLocal } from "./localStorage";

const accessToken = getDataLocal("access_token");

export const HTTP_HEADER_KEY = {
  CONTENT_TYPE: "Content-Type",
  AUTHORIZATION: "Authorization",
};

export const HTTP_HEADER_VALUE = {
  APPLICATION_JSON: "Application/json",
  BEARTOKEN: "Bearber " + accessToken,
};

export interface ResponseInterface<T = any> {
  data?: T;
}

const HttpClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 3000,
  headers: {
    [HTTP_HEADER_KEY.CONTENT_TYPE]: HTTP_HEADER_VALUE.APPLICATION_JSON,
    [HTTP_HEADER_KEY.AUTHORIZATION]: HTTP_HEADER_VALUE.BEARTOKEN,
  },
});

export default HttpClient;

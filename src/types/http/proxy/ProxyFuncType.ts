import { ProxyStatusEnum } from "./ProxyStatus";

export interface ProxyFuncSuccessInterface<T> {
  status: ProxyStatusEnum.SUCCESS;
  data: T;
}

export interface ProxyFuncErrorInterface {
  status: Exclude<ProxyStatusEnum, ProxyStatusEnum.SUCCESS>;
  code?: number;
  message?: string;
  errors?: any[];
}

export type ProxyFuncType<T = any> =
  | ProxyFuncSuccessInterface<T>
  | ProxyFuncErrorInterface;

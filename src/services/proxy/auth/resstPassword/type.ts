
export interface ResetProxyParams {
  token:string;
}

export interface ResetProxyBody {
  password: string;
  confirmPassword: string;
}


export interface ResetProxyTransformInterface {
  msg: string;
}

export interface ResetProxyResponseInterface {
  msg: string;
}

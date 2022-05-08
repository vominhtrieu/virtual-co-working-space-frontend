export interface ParamsInterface {
  id: string;
}

export interface ProxyResponseInterface {
  invitation:{
    office:OfficeInvitationInterface 
  }
}

export interface ProxyTransformInterface {
  invitation:{
    office:OfficeInvitationInterface 
  }
}

export  interface OfficeInvitationInterface {
  id: number;
  name: string;
  invitationCode: string;
  createAt: string;
}



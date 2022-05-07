export interface ParamsInterface {
  id: string;
}

export interface ApiResponseInterface {
  data: {
    invitation:{
      office:OfficeInvitationInterface 
    }
  }
  status?: string;
  code?: number;
  message?: string;
  errors?: any[];
}

export  interface OfficeInvitationInterface {
  id: number;
  name: string;
  invitationCode: string;
  createAt: string;
}
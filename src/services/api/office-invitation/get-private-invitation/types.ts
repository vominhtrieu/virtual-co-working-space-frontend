export interface ParamsInterface {
  id: string;
}

export interface ApiResponseInterface {
  data: {
    invitation:{
      id: number;
      inviter: InviterInvitationInterface;
      inviteEmail: string;
      token: string; 
      office: OfficeInvitationInterface;
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

export  interface InviterInvitationInterface {
  id: number;
  name: string;
  email: string;
}
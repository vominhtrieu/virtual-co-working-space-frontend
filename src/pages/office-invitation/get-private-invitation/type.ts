export interface InvitationInterface {
  invitation:{
    id: number;
    inviter: InviterInvitationInterface;
    inviteEmail: string;
    token: string; 
    office: OfficeInvitationInterface;
  }
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
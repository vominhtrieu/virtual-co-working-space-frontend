export interface InvitationInterface {
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
  
  
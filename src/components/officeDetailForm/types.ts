export interface OfficeDetailFormProps {
  onClose: () => void;
  id: number;
  isOwner: boolean;
}

export interface EditOfficeDetailFormValuesInterface {
  name: string;
  avatarUrl:string;
  description:string;
}

export interface CreateInvitationFormValuesInterface {
  email: string;
  officeId:number;
}


export interface OfficeDetailInterface {
  id: number;
  name: string;
  invitationCode: string;
  avatarUrl:string;
  createdBy: {
    id: number;
    name: string;
    avatar?: string;
  };
  officeItems: any[];
  officeMembers: OfficeMembersInterface[];
  createdAt: string;
}

interface OfficeMembersInterface {
  id: number;
  officeId: number;
  member: {
    id: number;
    name: string;
    avatar?: string;
  };
  onlineStatus: string;
  transform: {
    position: {
      x: number;
      y: number;
      z: number;
    };
    rotation: {
      x: number;
      y: number;
      z: number;
    };
  };
}

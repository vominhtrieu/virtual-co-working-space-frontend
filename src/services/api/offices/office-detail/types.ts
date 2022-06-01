export interface OfficeParamsInterface {
  id: number;
}

export interface OfficeApiResponseInterface {
  data: {
    office: OfficeDetailInterface;
  };
  status?: string;
  code?: number;
  message?: string;
  errors?: any[];
}

interface OfficeDetailInterface {
  id: number;
  name: string;
  invitationCode: string;
  avatarUrl: string;
  description: string;
  createdBy: {
    id: number;
    name: string;
    avatar?: string;
  };
  officeItems: any[];
  officeMembers: OfficeMembersInterface[];
  createdAt: string;
  conversations: {
    id: number;
    officeId: number;
    name: string;
    type: string;
  }[];
}

export interface OfficeMembersInterface {
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

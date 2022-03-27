export interface UpdateOfficeParamsInterface {
  id: number;
  name: string;
}

export interface UpdateOfficeApiResponseInterface {
  office: UpdateOfficeInterface;
  status?: string;
  code?: number;
  message?: string;
  errors?: any[];
}

interface UpdateOfficeInterface {
  id: number;
  name: string;
  invitationCode: string;
  createdBy: {
    id: number;
    name: string;
    avatar?: string;
  };
  officeItems: any[];
  officeMembers: UpdateOfficeMembersInterface[];
  createdAt: string;
}

interface UpdateOfficeMembersInterface {
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

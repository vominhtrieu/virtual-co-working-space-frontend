export interface OfficeDetailFormProps {
  onClose: () => void;
  id: number;
}

export interface EditOfficeDetailFormValuesInterface {
  name: string;
}

export interface OfficeDetailInterface {
  id: number;
  name: string;
  invitationCode: string;
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

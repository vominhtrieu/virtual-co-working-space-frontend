import { OfficeMembersInterface } from "../services/api/offices/office-detail/types";

export interface CoordinatesInterface {
  x: number;
  y: number;
  z: number;
}

export interface TransformInterface {
  position: CoordinatesInterface;
  rotation: CoordinatesInterface;
}

export interface OfficeUserInterface {
  id: number;
  name: string;
  avatar?: string;
}

export interface OfficeInterface {
  id: number;
  name: string;
  invitationCode: string;
  avatarUrl: string;
  createdBy: OfficeUserInterface;
  createdAt: string;
}

export interface MemberOfficeInterface {
  id: number;
  officeId: number;
  member: OfficeUserInterface;
  onlineStatus: string;
  transform: TransformInterface;
}

export interface OfficeDetailInterface {
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

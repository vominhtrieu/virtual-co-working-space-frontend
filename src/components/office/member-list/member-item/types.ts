import { OfficeDetailInterface } from "../../../office-detail-form/types";

export interface MemberItemProps {
  avatarUrl?: string;
  userName: string;
  role: string;
  userId: number;
  isOnline?: boolean;
  onClick: (userId: number) => void;
  onKickMember: (memberId: number) => void;
  officeDetail: OfficeDetailInterface;
}

export interface MemberItemProps {
  avatarUrl?: string;
  userName: string;
  role: string;
  userId: number;
  isOnline?: boolean;
  onClick: (userId: number) => void;
}

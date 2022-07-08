export interface KickMemberParamsInterface {
  officeId: number;
  memberId: number;
}

export interface KickMemberApiResponseInterface {
  data: {
    officeId: number;
    officeMemberId: number;
    officeRoleId: number;
  };

  status?: string;
  code?: number;
  message?: string;
  errors?: any[];
}

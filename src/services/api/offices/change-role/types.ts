export interface ChangeRoleParamsInterface {
  officeId: number;
  memberId: number;
  roleId: number;
}

export interface ChangeRoleApiResponseInterface {
  data: {
    officeId: number;
    userId: number;
  };

  status?: string;
  code?: number;
  message?: string;
  errors?: any[];
}

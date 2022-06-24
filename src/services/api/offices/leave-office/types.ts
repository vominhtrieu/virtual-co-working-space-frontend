export interface LeaveOfficeParamsInterface {
  id: number;
}

export interface LeaveOfficeApiResponseInterface {
  data: {
    officeId: number;
    userId: number;
  };

  status?: string;
  code?: number;
  message?: string;
  errors?: any[];
}

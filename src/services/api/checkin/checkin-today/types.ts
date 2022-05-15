export interface IsCheckinTodayParamsInterface {
    officeId: number
}

export interface IsCheckinTodayResponseInterface {
    data: {
        userId: number, 
        officeId: number,
        checkinDate: Date
    }
    status?: string;
    code?: number;
    message?: string;
    errors?: any[];
}
export interface IsCheckinTodayParamsInterface {
    officeId: number
}

export interface IsCheckinTodayResponseInterface {
    data: {
        userId: number, 
        officeId: number,
        checkInDate: Date
    }
    status?: string;
    code?: number;
    message?: string;
    errors?: any[];
}
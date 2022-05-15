export interface CreateCheckinParamsInterface {
    officeId: number,
    proof: string
}

export interface CreateCheckinResponseInterface {
    data: {
        userId: number,
        officeId: number,
        checkInDate: Date,
    },
    status?: string;
    code?: number;
    message?: string;
    errors?: any[];
}
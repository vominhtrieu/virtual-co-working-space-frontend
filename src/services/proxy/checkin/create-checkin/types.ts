export interface CreateCheckinParamsProxy {
    officeId: number,
    proof: string
}

export interface CreateCheckinResponseProxy {
    userId: number,
    officeId: number,
    checkinDate: Date
}
export interface UploadProofParamsInterface {
    formData: FormData
}

export interface UploadProofResponseInterface {
    data: {
        url: string
    },
    status?: string;
    code?: number;
    message?: string;
    errors?: any[];
}
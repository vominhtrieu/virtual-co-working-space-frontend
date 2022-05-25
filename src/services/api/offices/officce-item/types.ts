import { message } from 'antd';
import { Item } from "../get-office-item/types";

export interface OfficeItemTransform {
    xRotation: number,
    yRotation: number,
    zRotation: number,
    xPosition: number,
    yPosition: number,
    zPosition: number,
}

export interface OfficeItem {
    id: number,
    item: Item,
    officeId: number,
    createdAt: number,
    transform: OfficeItemTransform
}

export interface GetOfficeItemResponseInterface {
    data: {
        officeItems: OfficeItem[],
        total: number
    },
    status?: string,
    code?: number,
    message?: string,
    error?: any[]
}
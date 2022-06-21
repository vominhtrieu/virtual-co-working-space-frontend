import { ItemInterface } from "../../../../types/item";

export interface BodyInterface {
  pushToken: string;
}

export interface ApiResponseInterface {
  data: {
    pushToken: string;
  }
  code?: number;
  message?: string;
  errors?: string[];
  status?: string;
  }
  
  
import { OfficeInterface } from "../../../types/office";
export interface ThumbnailPropsInterface {
  src?: string;
  alt?: string;
  office?: OfficeInterface;
  onClick?: () => void;
}

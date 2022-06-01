import { OfficeDetailInterface } from "../../office-detail-form/types";

export interface OfficeBarPropsInterface {
  action:
    | "action"
    | "character"
    | "config"
    | "member"
    | "chatList"
    | "chatBox"
    | "setting"
    | "detail"
    | "";
  setAction: (
    action:
      | "action"
      | "character"
      | "config"
      | "member"
      | "chatList"
      | "chatBox"
      | "setting"
      | "detail"
      | ""
  ) => void;
  isOwner?: boolean;
  officeDetail: OfficeDetailInterface;
}

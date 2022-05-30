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
}

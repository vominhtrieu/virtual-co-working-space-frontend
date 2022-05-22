export interface OfficeBarPropsInterface {
  action: "action" | "character" | "config" | "member" | "setting" | "";
  setAction: (
    action: "action" | "character" | "config" | "member" | "setting" | ""
  ) => void;
  isOwner?: boolean;
}

export interface OfficeBarPropsInterface {
  action: "action" | "character" | "config" | "member" | "chatList" | "chatBox" | "setting" | "";
  setAction: (
    action: "action" | "character" | "config" | "member" | "chatList" | "chatBox" | "setting" | ""
  ) => void;
  isOwner?: boolean;
}

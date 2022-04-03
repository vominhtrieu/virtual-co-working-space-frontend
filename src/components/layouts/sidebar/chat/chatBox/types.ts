export interface ChatBoxPropsInterface {
  isChatListOpen: boolean;
  submitMessage: (message: string) => void;
}

export interface InputInterface {
  message: string;
}

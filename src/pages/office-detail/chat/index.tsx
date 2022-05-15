import { useState } from "react";
// import socket from "../../../services/socket/socket";
import ChatBox from "./chat-box";
import ChatList from "./chat-list";
import { SidebarChatPropsInterface } from "./types";
import { useAppSelector } from "../../../stores";
import { socketSelector } from "../../../stores/socket-slice";

const SidebarChat = (props: SidebarChatPropsInterface) => {
  const { conversationId } = props;
  const [isChatListOpen, setIsChatListOpen] = useState(false);
  const socket = useAppSelector(socketSelector.getSocket)

  const handleSubmitMessage = (values: string) => {
    socket.emit("message:send", {
      conversationId: conversationId,
      content: values,
    });
  };

  return (
    <div className="sidebar-chat">
      <div className="sidebar-chat__title">Chat</div>
      <ChatList
        isOpen={isChatListOpen}
        onToggled={() => setIsChatListOpen(!isChatListOpen)}
        onOpen={() => setIsChatListOpen(true)}
        onClose={() => setIsChatListOpen(false)}
      />
      <ChatBox
        conversationId={conversationId}
        submitMessage={handleSubmitMessage}
      />
    </div>
  );
};

export default SidebarChat;

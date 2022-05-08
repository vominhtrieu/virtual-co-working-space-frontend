import { useState } from "react";
import socket from "../../../services/socket/socket";
import ChatBox from "./chatBox";
import ChatList from "./chatList";
import { SidebarChatPropsInterface } from "./types";

const SidebarChat = (props: SidebarChatPropsInterface) => {
  const { conversationId } = props;
  const [isChatListOpen, setIsChatListOpen] = useState(false);

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

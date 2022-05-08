import { useState } from "react";
import socket from "../../../services/socket/socket";
import ChatBox from "./chatBox";
import ChatList from "./chatList";

const SidebarChat = () => {
  const [countChat, setCountChat] = useState(0);
  const [isChatListOpen, setIsChatListOpen] = useState(false);

  const handleSubmitMessage = (values: string) => {
    socket.emit("message:send", {
      conversationId: 3,
      content: values,
    });
    setCountChat((curr) => curr + 1);
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
      <ChatBox countChat={countChat} submitMessage={handleSubmitMessage} />
    </div>
  );
};

export default SidebarChat;

import SidebarBox from "../sidebarBox";
import ChatList from "./chatList";
import ChatBox from "./chatBox";
import { useState } from "react";

const SidebarChat = () => {
  const [isChatListOpen, setIsChatListOpen] = useState(false);

  const handleSubmitMessage = (values) => {
    console.log(values);
  };
  return (
    <SidebarBox>
      <div className='sidebar-chat'>
        <div className='sidebar-chat__title'>Chat</div>
        <ChatList
          isOpen={isChatListOpen}
          onToggled={() => setIsChatListOpen(!isChatListOpen)}
          onOpen={() => setIsChatListOpen(true)}
          onClose={() => setIsChatListOpen(false)}
        />
        <ChatBox
          isChatListOpen={isChatListOpen}
          submitMessage={handleSubmitMessage}
        />
      </div>
    </SidebarBox>
  );
};

export default SidebarChat;

import SidebarBox from "../sidebarBox";
import { useState } from "react";
import NotyList from "./noti-List";

const SidebarNotification = () => {
  const [isChatListOpen, setIsChatListOpen] = useState(false);

  const handleSubmitMessage = (values) => {
    console.log(values);
  };
  return (
    <SidebarBox>
      <div className='sidebar-chat'>
        <div className='sidebar-chat__title'>Notification</div>
        <NotyList
          isOpen={isChatListOpen}
          onToggled={() => setIsChatListOpen(!isChatListOpen)}
          onOpen={() => setIsChatListOpen(true)}
          onClose={() => setIsChatListOpen(false)}
        />
      </div>
    </SidebarBox>
  );
};

export default SidebarNotification;

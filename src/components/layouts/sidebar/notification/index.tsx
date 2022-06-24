import SidebarBox from "../sidebar-box";
import { useState, useEffect } from "react";
import NotyList from "./noty-list";

const SidebarNotification = () => {
  const [isChatListOpen, setIsChatListOpen] = useState(false);
  const [notification, setNotification] = useState({title: '', body: ''});

  return (
    <SidebarBox>
      <div className='sidebar-noty'>
        <div className='sidebar-noty__title'>Notification</div>
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

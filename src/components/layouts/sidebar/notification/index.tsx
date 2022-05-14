import SidebarBox from "../sidebarBox";
import { useState, useEffect } from "react";
import NotyList from "./noti-List";
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, Messaging, onMessage } from "firebase/messaging";
import firebaseConfig from '../../../../helpers/firebase';


const SidebarNotification = () => {
  const [isChatListOpen, setIsChatListOpen] = useState(false);

 

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

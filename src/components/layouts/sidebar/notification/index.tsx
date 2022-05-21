import SidebarBox from "../sidebar-box";
import { useState, useEffect } from "react";
import NotyList from "./noty-list";
import firebaseConfig from "../../../../helpers/firebase"
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, Messaging, onMessage } from "firebase/messaging";


const SidebarNotification = () => {
  const [isChatListOpen, setIsChatListOpen] = useState(false);
  const [notification, setNotification] = useState({title: '', body: ''});

  
  useEffect(() => {
    initializeApp(firebaseConfig);
    const messaging:Messaging = getMessaging();
    getToken(messaging, { vapidKey: 'BFNDwXaHYZ7pjozGhQKcUor5i9OKFuoBaTOI1A54f22N_oWJEo7MOnln1x0yilN2H3FhqeIWMxcLFrkjCXSOV1Y' }).then((currentToken) => {
        if (currentToken) {
            console.log(currentToken);
            onMessage(messaging, (payload) => {
                console.log('Message received. ', payload);
            });
        } else {
            console.log('No registration token available. Request permission to generate one.');
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });
},[]);

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

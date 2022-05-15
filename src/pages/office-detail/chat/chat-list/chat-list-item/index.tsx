import { ChatListItemPropsInterface } from "./types";

const srcTemp = "https://ss-images.saostar.vn/2020/01/03/6750639/page1.jpg";

const ChatListItem = (props: ChatListItemPropsInterface) => {
  const { src, alt, name, isOnline, lastMessage, lastSeen } = props;

  return (
    <div className='chat-list-item'>
      <img src={src ?? srcTemp} alt={alt} className='chat-list-item__img' />

      <div className='chat-list-item__content'>
        <div className='chat-list-item__name'>
          {name ?? "Nguyen Van A"}
          <div
            className={"chat-list-item__status" + (isOnline ? " onl" : " off")}
          />
        </div>
        <div className='chat-list-item__last-message'>
          {lastMessage ?? "Hello, how are you?"}
          {!isOnline && (
            <span className='chat-list-item__time'>{lastSeen ?? "10h"}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatListItem;

import { useAppSelector } from "../../../../stores";
import { socketSelector } from "../../../../stores/socket-slice";
import { ChatItemProps } from "./types";

const ChatItem = (props: ChatItemProps) => {
  const {
    avatarUrl,
    name,
    lastMess,
    onSelectConversation,
    conversationId,
    isOnline,
  } = props;

  const socket = useAppSelector(socketSelector.getSocket);

  const handleMaskAsMessage = (conversationId: number) => {
    socket.emit("message:maskAsRead", {
      conversationId: conversationId,
    });
  };

  return (
    <div
      className="chat-item"
      onClick={() => {
        handleMaskAsMessage(conversationId);
        onSelectConversation(conversationId);
      }}
    >
      <div className="chat-item__user-box">
        <div className="chat-item__avatar">
          <img
            className="chat-item__image"
            src={avatarUrl}
            alt="avatar"
          />
          <span className={`chat-item__online ${isOnline ? "onl" : "off"}`} />
        </div>

        <div className="chat-item__user">
          <div className="chat-item__name">{name}</div>
          <div className="chat-item__last-mess">{lastMess}</div>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;

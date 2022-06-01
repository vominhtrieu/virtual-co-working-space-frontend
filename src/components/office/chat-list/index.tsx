import { useEffect, useState } from "react";
import { useAppSelector } from "../../../stores";
import { socketSelector } from "../../../stores/socket-slice";
import RightBar from "../../layouts/rightbar";
import ChatItem from "./chat-item";
import CreateConversationForm from "./create-conversation-form";
import { ChatListProps } from "./types";

const ChatList = (props: ChatListProps) => {
  const { onClose, onSelectConversation, officeDetail } = props;
  const [isCreate, setIsCreate] = useState(false);

  const socket = useAppSelector(socketSelector.getSocket);

  const handleCreateConversation = (values) => {
    socket.emit("conversation:create", {
      name: values.name,
      memberIds: values.memberIds,
    });
  };

  useEffect(() => {
    socket.on("conversation:created", (value) => {});
  }, [socket]);

  return (
    <>
      {isCreate && (
        <CreateConversationForm
          onClose={() => setIsCreate(false)}
          onSubmit={handleCreateConversation}
          memberList={officeDetail.officeMembers}
        />
      )}
      <RightBar onClose={onClose} isAdd onAdd={() => setIsCreate(true)}>
        {officeDetail?.conversations?.map((conversation) => {
          return (
            <ChatItem
              onSelectConversation={onSelectConversation}
              key={conversation.id}
              conversationId={conversation.id}
              name={conversation.name ?? "Tên cuộc trò chuyện"}
              lastMess={"Làm ui lẹ lẹ lẹ"}
              isOnline
            />
          );
        })}
      </RightBar>
    </>
  );
};

export default ChatList;

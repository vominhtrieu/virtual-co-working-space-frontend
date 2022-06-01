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
  const [conversationList, setConversationList] = useState<
    {
      id: number;
      officeId: number;
      name: string;
      type: string;
    }[]
  >([]);

  const socket = useAppSelector(socketSelector.getSocket);

  const handleCreateConversation = (values) => {
    socket.emit("conversation:create", {
      name: values.name,
      memberIds: values.memberIds,
    });
  };

  useEffect(() => {
    setConversationList(officeDetail.conversations);
    console.log("on conversation list change");
    socket.on("conversation:created", (value) => {
      console.log(value);
    });

    return () => {
      socket.off("conversation:created");
    };
  }, [socket, officeDetail.conversations]);

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
        {conversationList?.map((conversation) => {
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

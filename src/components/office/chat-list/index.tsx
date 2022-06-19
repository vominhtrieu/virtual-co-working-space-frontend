import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getConversations } from "../../../services/api/offices/get-conversations";
import { useAppSelector } from "../../../stores";
import { userSelectors } from "../../../stores/auth-slice";
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
      lastMess?: string;
    }[]
  >([]);

  const userInfo = useAppSelector(userSelectors.getUserInfo);
  const socket = useAppSelector(socketSelector.getSocket);

  const { t } = useTranslation();

  useEffect(() => {
    getConversations({ id: officeDetail?.id })
      .then((res) => {
        if (res.code !== 200) {
          return;
        }

        if (res.code === 200) {
          setConversationList((curr) => {
            const addLastMess = curr.map((conversation) => {
              return {
                ...conversation,
                lastMess: res.data.conversations.find(
                  (con) => con.conversation.id === conversation.id
                )?.conversation.latestMessage.content,
              };
            });

            return addLastMess;
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [officeDetail.id]);

  const handleCreateConversation = (values) => {
    socket.emit("conversation:create", {
      name: values.name,
      userIds: values.memberIds,
    });
  };

  useEffect(() => {
    setConversationList(officeDetail?.conversations);
    socket.on("conversation:created", (value) => {
      const newConversation = {
        id: value.conversation.id,
        officeId: value.conversation.officeId,
        name: value.conversation.name,
        type: value.conversation.type,
      };

      setConversationList((prev) => [...prev, newConversation]);
    });

    return () => {
      socket.off("conversation:created");
    };
  }, [socket, officeDetail?.conversations]);

  return (
    <>
      {isCreate && (
        <CreateConversationForm
          onClose={() => setIsCreate(false)}
          onSubmit={handleCreateConversation}
          memberList={officeDetail?.officeMembers.filter(
            (member) => member.member.id !== userInfo.id
          )}
        />
      )}
      <RightBar
        onClose={onClose}
        isAdd
        onAdd={() => setIsCreate(true)}
        title={t("pages.office.chatList.title")}
      >
        {conversationList?.map((conversation) => {
          return (
            <ChatItem
              onSelectConversation={onSelectConversation}
              key={conversation.id}
              conversationId={conversation.id}
              name={conversation.name ?? "Tên cuộc trò chuyện"}
              lastMess={conversation?.lastMess ?? ""}
              isOnline
            />
          );
        })}
      </RightBar>
    </>
  );
};

export default ChatList;

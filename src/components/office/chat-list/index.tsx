import { useEffect, useState } from "react";
import { toastError } from "../../../helpers/toast";
import OfficeDetailProxy from "../../../services/proxy/offices/office-detail";
import { ProxyStatusEnum } from "../../../types/http/proxy/ProxyStatus";
import RightBar from "../../layouts/rightbar";
import { OfficeDetailInterface } from "../../office-detail-form/types";
import ChatItem from "./chat-item";
import { ChatListProps } from "./types";

const ChatList = (props: ChatListProps) => {
  const [officeDetail, setOfficeDetail] = useState<OfficeDetailInterface>();
  const { onClose, id, onSelectConversation } = props;

  useEffect(() => {
    OfficeDetailProxy({ id: id })
      .then((res) => {
        if (res.status === ProxyStatusEnum.FAIL) {
          toastError(res.message ?? "Get offices detail fail");
          return;
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          setOfficeDetail(res.data.office ?? {});
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <RightBar onClose={onClose}>
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
  );
};

export default ChatList;

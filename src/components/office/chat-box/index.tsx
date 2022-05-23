import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaGrin, FaPaperPlane } from "react-icons/fa";
import { ChatItemInterface } from "../../../pages/office-detail/chat/chat-box/types";
import GetMessagesProxy from "../../../services/proxy/conversations/get-messages";
import { useAppSelector } from "../../../stores";
import { userSelectors } from "../../../stores/auth-slice";
import { socketSelector } from "../../../stores/socket-slice";
import { ProxyStatusEnum } from "../../../types/http/proxy/ProxyStatus";
import RightBar from "../../layouts/rightbar";
import InputText from "../../UI/form-controls/input-text";
import ChatBoxItem from "./chat-box-item";
import { ChatBoxProps } from "./types";

const ChatBox = (props: ChatBoxProps) => {
  const { onClose, onBack, conversationId, submitMessage } = props;

  const [chatList, setChatList] = useState<ChatItemInterface[]>([]);
  const socket = useAppSelector(socketSelector.getSocket);

  const ref = useRef<any>(null);

  // get userID
  const userInfo = useAppSelector(userSelectors.getUserInfo);

  useEffect(() => {
    GetMessagesProxy({ id: conversationId })
      .then((res) => {
        if (res.status === ProxyStatusEnum.FAIL) {
          return;
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          const chatListTransform: ChatItemInterface[] =
            res?.data?.messages?.messages.map((mess) => {
              return {
                src:
                  mess?.sender?.avatar ??
                  "https://s199.imacdn.com/tt24/2020/03/06/c13c137597da081f_f4278fdff371f2b7_93155158347150251.jpg",
                alt: mess?.sender.name,
                message: mess?.content,
                isMe: userInfo.id === mess?.sender.id,
              };
            });

          setChatList(chatListTransform.reverse());

          if (ref !== null && ref.current !== null) {
            ref.current.scrollIntoView({ behavior: "smooth" });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userInfo.id, conversationId]);

  useEffect(() => {
    socket.emit("conversation:join", {
      conversationId: conversationId,
    });

    socket.on("message:sent", (value) => {
      const newChatItem = {
        src: "",
        alt: "",
        message: value["content"],
        isMe: userInfo.id === value["senderId"],
      };

      setChatList((curr) => [...curr, newChatItem]);
    });

    ref.current.scrollIntoView({ behavior: "smooth" });

    return () => {
      socket.off("message:sent");
    };
  }, [conversationId, socket, userInfo.id]);

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      message: "",
    },
  });

  const handleSendMess = (values) => {
    submitMessage(values.message);
    setValue("message", "");
    if (ref !== null && ref.current !== null) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <RightBar onClose={onClose} onBack={onBack} isBack>
      <div className="chat-box">
        <ul className="chat-box__list">
          {chatList.map((item, index) => {
            return (
              <li className="chat-box__item" key={index}>
                <ChatBoxItem
                  message={item.message}
                  alt={item.alt}
                  name={item.alt}
                  isMe={item.isMe}
                />
              </li>
            );
          })}
          <div ref={ref} />
        </ul>
      </div>
      <form className="chat-box__form" onSubmit={handleSubmit(handleSendMess)}>
        <FaGrin className="chat-box__icon-emoji" />
        <InputText
          size="large"
          name="message"
          control={control}
          placeholder="Nhập tin nhắn"
          style={{
            outline: "none",
            border: "none",
            borderRadius: "0",
            borderBottom: "1px solid #fff",
          }}
        />
        <button
          style={{
            backgroundColor: "transparent",
            outline: "none",
            border: "none",
          }}
        >
          <FaPaperPlane className="chat-box__icon-send" />
        </button>
      </form>
    </RightBar>
  );
};

export default ChatBox;

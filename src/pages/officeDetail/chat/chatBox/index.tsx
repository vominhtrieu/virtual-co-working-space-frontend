import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { RiSendPlaneFill } from "react-icons/ri";
import InputText from "../../../../components/UI/form-controls/inputText";
import GetMessagesProxy from "../../../../services/proxy/conversations/get-messages";
// import socket from "../../../../services/socket/socket";
import { useAppSelector } from "../../../../stores";
import { userSelectors } from "../../../../stores/auth-slice";
import { ProxyStatusEnum } from "../../../../types/http/proxy/ProxyStatus";
import ChatBoxItem from "./chatBoxItem";
import {
  ChatBoxPropsInterface,
  ChatItemInterface,
  InputInterface,
} from "./types";
import { socketSelector } from "../../../../stores/socket-slice";

const ChatBox = (props: ChatBoxPropsInterface) => {
  const [chatList, setChatList] = useState<ChatItemInterface[]>([]);
  const { submitMessage, conversationId } = props;
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
  }, [userInfo.id]);

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
  }, []);

  const { control, handleSubmit, setValue } = useForm<InputInterface>({
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
    <>
      <div className={"chat-box"}>
        <div className="chat-box__title">Nguyen Van A</div>

        <div className="chat-box__content">
          <ul className="chat-box__items">
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
      </div>
      <form className="chat-box__form" onSubmit={handleSubmit(handleSendMess)}>
        <InputText
          size="large"
          name="message"
          control={control}
          placeholder="Write a message ..."
        />
        <button
          style={{
            backgroundColor: "transparent",
            outline: "none",
            border: "none",
          }}
        >
          <RiSendPlaneFill className="chat-box__icon-send" />
        </button>
      </form>
    </>
  );
};

export default ChatBox;

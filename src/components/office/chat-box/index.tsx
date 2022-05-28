import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { FaGrin, FaPaperPlane } from "react-icons/fa";
import { useCaretPosition } from "react-use-caret-position";
import { ChatItemInterface } from "../../../pages/office-detail/chat/chat-box/types";
import GetMessagesProxy from "../../../services/proxy/conversations/get-messages";
import { useAppSelector } from "../../../stores";
import { userSelectors } from "../../../stores/auth-slice";
import { socketSelector } from "../../../stores/socket-slice";
import { ProxyStatusEnum } from "../../../types/http/proxy/ProxyStatus";
import RightBar from "../../layouts/rightbar";
import InputText from "../../UI/form-controls/input-text";
import ChatBoxItem from "./chat-box-item";
import { emojiList } from "./emoji";
import { ChatBoxProps } from "./types";

const ChatBox = (props: ChatBoxProps) => {
  const { onClose, onBack, conversationId, submitMessage } = props;
  const [isShowEmojiBox, setIsShowEmojiBox] = useState(false);

  const [chatList, setChatList] = useState<ChatItemInterface[]>([]);
  const socket = useAppSelector(socketSelector.getSocket);

  const scrollRef = useRef<any>(null);
  const emojiBoxRef = useRef<any>(null);
  const inputRef = useRef<any>(null);

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
                id: mess?.id,
                conversationId: mess?.conversationId,
              };
            });

          setChatList(chatListTransform.reverse());

          if (scrollRef !== null && scrollRef.current !== null) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
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
  }, [conversationId, socket]);

  useEffect(() => {
    socket.on("message:sent", (value) => {
      const newChatItem = {
        src: "",
        alt: "",
        message: value["content"],
        isMe: userInfo.id === value["senderId"],
        id: value["id"],
        conversationId: value["conversationId"],
      };

      setChatList((curr) => [...curr, newChatItem]);
    });

    scrollRef.current.scrollIntoView({ behavior: "smooth" });

    return () => {
      socket.off("message:sent");
    };
  }, [conversationId, socket, userInfo.id]);

  useEffect(() => {
    socket.on("message:deleted", (value) => {
      // remove message from chat list
      setChatList((curr) => curr.filter((item) => item.id !== value));
    });

    scrollRef.current.scrollIntoView({ behavior: "smooth" });

    return () => {
      socket.off("message:deleted");
    };
  }, [conversationId, socket, userInfo.id]);
  

  useEffect(() => {
    socket.on("message:revoked", (value) => {
      console.log("revoke", value);
      // remove message from chat list
      setChatList((curr) => curr.filter((item) => item.id !== value));
    });

    scrollRef.current.scrollIntoView({ behavior: "smooth" });

    return () => {
      socket.off("message:deleted");
    };
  }, [conversationId, socket]);

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      message: "",
    },
  });

  const handleSendMess = (values) => {
    submitMessage(values.message);
    setValue("message", "");
    setIsShowEmojiBox(false);
    if (scrollRef !== null && scrollRef.current !== null) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const watchMessage = useWatch({
    control,
    name: "message",
  });

  useEffect(() => {
    // check unfocus
    const handleClickOutside = (event: any) => {
      if (emojiBoxRef.current && !emojiBoxRef.current.contains(event.target)) {
        setIsShowEmojiBox(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEmojiClick = (emoji) => {
    setValue("message", `${watchMessage}${emoji}`);
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
                  id={item.id}
                  conversationId={item.conversationId}
                />
              </li>
            );
          })}
          <div ref={scrollRef} />
        </ul>
      </div>
      <form className="chat-box__form" onSubmit={handleSubmit(handleSendMess)}>
        <>
          {isShowEmojiBox && (
            <div className="chat-box__emoji-table" ref={emojiBoxRef}>
              {emojiList.map((emoji, index) => {
                return (
                  <span
                    key={index}
                    className="chat-box__emoji-item"
                    onClick={() => {
                      handleEmojiClick(emoji.content);
                    }}
                  >
                    {emoji.content}
                  </span>
                );
              })}
            </div>
          )}
          <FaGrin
            className="chat-box__icon-emoji"
            onClick={() => setIsShowEmojiBox((curr) => !curr)}
          />
        </>
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
          ref={inputRef}
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

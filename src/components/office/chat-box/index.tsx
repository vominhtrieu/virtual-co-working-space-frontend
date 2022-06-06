import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { FaGrin, FaPaperPlane } from "react-icons/fa";
import GetMessagesProxy from "../../../services/proxy/conversations/get-messages";
import { useAppSelector } from "../../../stores";
import { userSelectors } from "../../../stores/auth-slice";
import { socketSelector } from "../../../stores/socket-slice";
import { ProxyStatusEnum } from "../../../types/http/proxy/ProxyStatus";
import RightBar from "../../layouts/rightbar";
import InputText from "../../UI/form-controls/input-text";
import ChatBoxItem from "./chat-box-item";
import { emojiList } from "./emoji";
import { ChatBoxProps, ChatItemInterface } from "./types";
import { v4 as uuidv4 } from "uuid";
import UpdateConversationForm from "./update-conversation-form";
import AddMemberConversationForm from "./add-member-form";

const ChatBox = (props: ChatBoxProps) => {
  const {
    onClose,
    onBack,
    conversationId,
    submitMessage,
    conversationName,
    officeDetail,
  } = props;
  const [isShowEmojiBox, setIsShowEmojiBox] = useState(false);
  const [cursor, setCursor] = useState(0);
  const [chatList, setChatList] = useState<ChatItemInterface[]>([]);
  const socket = useAppSelector(socketSelector.getSocket);
  const [isShowUpdateForm, setIsShowUpdateForm] = useState(false);
  const [isShowAddMemberForm, setIsShowAddMemberForm] = useState(false);

  const scrollRef = useRef<any>(null);
  const emojiBoxRef = useRef<any>(null);
  const inputRef = useRef<any>(null);

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
                  officeDetail.officeMembers.find((sender) => {
                    return sender.id === mess.senderId;
                  })?.member.avatar ??
                  "https://s199.imacdn.com/tt24/2020/03/06/c13c137597da081f_f4278fdff371f2b7_93155158347150251.jpg",
                alt:
                  officeDetail.officeMembers.find((sender) => {
                    return sender.id === mess.senderId;
                  })?.member.name ?? "Tên người dùng",
                message:
                  mess.status === "revoked"
                    ? "Tin nhắn đã bị thu hồi"
                    : mess?.content,
                isMe: userInfo.id === mess?.senderId,
                id: mess?.id,
                conversationId: mess?.conversationId,
                senderId: mess?.senderId,
                reader: mess?.readers
                  ? mess?.readers.map((r) => {
                      return {
                        id: r.readerId,
                        name:
                          officeDetail.officeMembers.find(
                            (m) => m.id === r.readerId
                          )?.member.name ?? "Tên",

                        avatar:
                          officeDetail.officeMembers.find(
                            (m) => m.id === r.readerId
                          )?.member.avatar ??
                          "https://s199.imacdn.com/tt24/2020/03/06/c13c137597da081f_f4278fdff371f2b7_93155158347150251.jpg",
                      };
                    })
                  : [],
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
  }, [userInfo.id, conversationId, officeDetail.officeMembers]);

  useEffect(() => {
    socket.emit("conversation:join", {
      conversationId: conversationId,
    });
  }, [conversationId, socket]);

  useEffect(() => {
    socket.on("message:sent", (value) => {
      setChatList((curr) => {
        const newList = curr.map((item) => {
          if (item.tempId === value["tempId"]) {
            return {
              ...item,
              id: value["id"],
            };
          }
          return item;
        });

        if (userInfo.id !== value["senderId"]) {
          return [
            ...curr,
            {
              src:
                officeDetail.officeMembers.find((sender) => {
                  return sender.id === value["senderId"];
                })?.member.avatar ?? "",
              conversationId: value["conversationId"],
              alt:
                officeDetail.officeMembers.find((sender) => {
                  return sender.id === value["senderId"];
                })?.member.name ?? "",
              message: value["content"],
              isMe: false,
              id: value["id"],
              senderId: value["senderId"],
            },
          ];
        }

        return newList;
      });
    });

    scrollRef.current.scrollIntoView({ behavior: "smooth" });

    return () => {
      socket.off("message:sent");
    };
  }, [
    conversationId,
    socket,
    userInfo.id,
    chatList,
    officeDetail.officeMembers,
  ]);

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
      // replace message from chat list
      setChatList((curr) =>
        curr.map((item) => {
          if (item.id === value["messageId"]) {
            return {
              ...item,
              message: "Tin nhắn đã bị thu hồi",
            };
          }

          return item;
        })
      );
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
    if (values.message.trim() === "") return;

    const tempId = uuidv4();
    submitMessage(values.message, tempId);

    const newChatItem = {
      src: userInfo.avatar,
      alt: "",
      message: values.message,
      isMe: true,
      senderId: userInfo.id,
      id: -1,
      tempId: tempId,
      conversationId: conversationId,
    };
    setChatList((curr) => [...curr, newChatItem]);

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

  const handleChangeCursor = (value) => {
    setCursor(value);
  };

  const handleEmojiClick = (emoji) => {
    // insert emoji
    const preMess = watchMessage.slice(0, cursor);
    const postMess = watchMessage.slice(cursor);
    const newMess = preMess + emoji + postMess;
    setValue("message", newMess);
  };

  const handleUpdateConversation = (values) => {
    socket.emit("conversation:update", {
      conversationId: conversationId,
      name: values.name,
    });
  };

  const handleAddMemberConversation = (values) => {
    socket.emit("conversation:add_member", {
      conversationId: conversationId,
      userIds: values.memberIds,
    });
  };

  useEffect(() => {
    socket.on("conversation:updated", (value) => {
      console.log(value);
      // setConversationList((prev) => {
      //   return prev.map((item) => {
      //     if (item.id === value.conversation.id) {
      //       return {
      //         ...item,
      //         ...value.conversation,
      //       };
      //     }

      //     return item;
      //   });
      // });
    });

    return () => {
      socket.off("conversation:updated");
    };
  }, [socket, officeDetail.conversations]);

  useEffect(() => {
    socket.on("conversation:members_added", (value) => {
      console.log(value);
      // setConversationList((prev) => {
      //   return prev.map((item) => {
      //     if (item.id === value.conversation.id) {
      //       return {
      //         ...item,
      //         ...value.conversation,
      //       };
      //     }

      //     return item;
      //   });
      // });
    });

    return () => {
      socket.off("conversation:members_added");
    };
  }, [socket, officeDetail.conversations]);

  return (
    <>
      <RightBar
        onClose={onClose}
        onBack={onBack}
        isBack
        title={conversationName}
        isEdit
        onEdit={() => setIsShowUpdateForm(true)}
        isAddMember
        onAddMember={() => setIsShowAddMemberForm(true)}
      >
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
                    senderId={item.senderId}
                    conversationId={item.conversationId}
                    reader={item.reader}
                  />
                </li>
              );
            })}
            <div ref={scrollRef} />
          </ul>
        </div>
        <form
          className="chat-box__form"
          onSubmit={handleSubmit(handleSendMess)}
        >
          <>
            {isShowEmojiBox && (
              <div className="chat-box__emoji-table" ref={emojiBoxRef}>
                {emojiList.map((emoji, index) => {
                  return (
                    <div
                      key={index}
                      className="chat-box__emoji-item"
                      onClick={() => {
                        handleEmojiClick(emoji.content);
                      }}
                    >
                      {emoji.content}
                    </div>
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
              borderBottom: "1px solid rgb(255, 255, 255, 0.3)",
              color: "#fff",
            }}
            ref={inputRef}
            changeCursorPosition={handleChangeCursor}
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

      {isShowUpdateForm && (
        <UpdateConversationForm
          onClose={() => setIsShowUpdateForm(false)}
          onSubmit={handleUpdateConversation}
        />
      )}

      {isShowAddMemberForm && (
        <AddMemberConversationForm
          onClose={() => setIsShowAddMemberForm(false)}
          onSubmit={handleAddMemberConversation}
          memberList={officeDetail.officeMembers.filter((item) => {
            return item.member.id !== userInfo.id;
          })}
        />
      )}
    </>
  );
};

export default ChatBox;

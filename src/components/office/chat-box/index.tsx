import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FaGrin, FaPaperPlane } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { getConversation } from "../../../services/api/conversations/get-conversation";
import GetMessagesProxy from "../../../services/proxy/conversations/get-messages";
import { useAppSelector } from "../../../stores";
import { userSelectors } from "../../../stores/auth-slice";
import { socketSelector } from "../../../stores/socket-slice";
import { ProxyStatusEnum } from "../../../types/http/proxy/ProxyStatus";
import RightBar from "../../layouts/rightbar";
import InputText from "../../UI/form-controls/input-text";
import AddMemberConversationForm from "./add-member-form";
import ChatBoxItem from "./chat-box-item";
import { emojiList } from "./emoji";
import { ChatBoxProps, ChatItemInterface } from "./types";
import UpdateConversationForm from "./update-conversation-form";

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
  const [currentCursor, setCurrentCursor] = useState(1);
  const [conversationInfo, setConversationInfo] = useState<any>({})
  const [countGetConversation, setCountGetConversation] = useState(1)

  const scrollRef = useRef<any>(null);
  const emojiBoxRef = useRef<any>(null);
  const inputRef = useRef<any>(null);

  const userInfo = useAppSelector(userSelectors.getUserInfo);

  const { t } = useTranslation();

  useEffect(() => {
    getConversation({ id: conversationId }).then(res => {
      if (res.code !== 200) return;

      setConversationInfo(res?.data?.conversation)
    })
  }, [conversationId, countGetConversation])

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
                    return sender.member.id === mess.senderId;
                  })?.member.avatar ??
                  "https://s199.imacdn.com/tt24/2020/03/06/c13c137597da081f_f4278fdff371f2b7_93155158347150251.jpg",
                alt:
                  officeDetail.officeMembers.find((sender) => {
                    return sender.member.id === mess.senderId;
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
                          (m) => m.member.id === r.readerId
                        )?.member.name ?? "Tên",

                      avatar:
                        officeDetail.officeMembers.find(
                          (m) => m.member.id === r.readerId
                        )?.member.avatar ??
                        "https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg",
                    };
                  })
                  : [],
              };
            });

          setChatList(chatListTransform.reverse());
          setCurrentCursor(
            chatListTransform.reverse()[0]
              ? chatListTransform.reverse()[0].id
              : 0
          );

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
                  return sender.member.id === value["senderId"];
                })?.member.avatar ??
                "https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg",
              conversationId: value["conversationId"],
              alt:
                officeDetail.officeMembers.find((sender) => {
                  return sender.member.id === value["senderId"];
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
    socket.on("conversation:members_added", (value) => {
      setCountGetConversation(curr => curr + 1)
    });

    return () => {
      socket.off("conversation:members_added");
    };
  }, [socket, officeDetail.conversations]);

  const handleScrollMess = (event) => {
    if (event.target.scrollTop === 0) {
      if (currentCursor === 0) return;
      // load more message
      GetMessagesProxy({ id: conversationId, nextCursor: currentCursor })
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
                      return sender.member.id === mess.senderId;
                    })?.member.avatar ??
                    "https://s199.imacdn.com/tt24/2020/03/06/c13c137597da081f_f4278fdff371f2b7_93155158347150251.jpg",
                  alt:
                    officeDetail.officeMembers.find((sender) => {
                      return sender.member.id === mess.senderId;
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
                            (m) => m.member.id === r.readerId
                          )?.member.name ?? "Tên",

                        avatar:
                          officeDetail.officeMembers.find(
                            (m) => m.member.id === r.readerId
                          )?.member.avatar ??
                          "https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg",
                      };
                    })
                    : [],
                };
              });
            setChatList((prev) => [...chatListTransform.reverse(), ...prev]);
            setCurrentCursor(
              chatListTransform.reverse()[0]
                ? chatListTransform.reverse()[0].id
                : 0
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

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
          <ul className="chat-box__list" onScroll={handleScrollMess}>
            {chatList.map((item, index) => {
              return (
                <li className="chat-box__item" key={index}>
                  <ChatBoxItem
                    message={item.message}
                    src={item.src}
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
            placeholder={t("pages.office.chatBox.enterMessage")}
            style={{
              outline: "none",
              border: "none",
              borderRadius: "0",
              borderBottom: "none",
              padding: 0,
              color: "#fff",
              fontSize: "1.5rem",
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
          conversationName={conversationName}
        />
      )}

      {isShowAddMemberForm && (
        <AddMemberConversationForm
          onClose={() => setIsShowAddMemberForm(false)}
          onSubmit={handleAddMemberConversation}
          memberList={officeDetail.officeMembers.filter((item) => {
            return conversationInfo?.members?.findIndex(member => {
              return member?.user?.id === item?.member?.id
            }) < 0;
          })}
        />
      )}
    </>
  );
};

export default ChatBox;

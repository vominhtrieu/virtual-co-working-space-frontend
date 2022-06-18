import { Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";
import { FaTrashAlt, FaUndo } from "react-icons/fa";
import { useAppSelector } from "../../../../stores";
import { userSelectors } from "../../../../stores/auth-slice";
import { socketSelector } from "../../../../stores/socket-slice";
import { ChatBoxItemPropsInterface } from "./types";

const srcTemp =
  "https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg";

const ChatBoxItem = (props: ChatBoxItemPropsInterface) => {
  const [isOpenAction, setIsOpenAction] = useState(false);
  const { src, alt, message, isMe, conversationId, senderId, id, reader } =
    props;
  const actionRef = useRef<HTMLDivElement>(null);

  const socket = useAppSelector(socketSelector.getSocket);

  const userInfo = useAppSelector(userSelectors.getUserInfo);

  useEffect(() => {
    // check unfocus
    const handleClickOutside = (event: any) => {
      if (actionRef.current && !actionRef.current.contains(event.target)) {
        setIsOpenAction(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    socket.on("message:read", (value) => {
      console.log(value);
    });

    return () => {
      socket.off("message:read");
    };
  }, [socket, reader]);

  // handle delete message
  const handleDeleteMessage = () => {
    socket.emit("message:delete", {
      conversationId: conversationId,
      messageId: id,
    });
  };

  // handle revoked message
  const handleRevokedMessage = () => {
    socket.emit("message:revoke", {
      conversationId: conversationId,
      messageId: id,
    });
  };

  return (
    <div className={"chat-box-item" + (isMe ? " mine" : "")}>
      {!isMe && <Tooltip placement="topLeft" title={alt}>
        <img src={src ?? srcTemp} alt={alt} className="chat-box-item__avatar" />
      </Tooltip>
      }
      <div
        className="chat-box-item__message"
        onClick={() => {
          setIsOpenAction((curr) => !curr);
        }}
      >
        {isOpenAction && (
          <div className="chat-box-item__action" ref={actionRef}>
            <ul className="chat-box-item__action-list">
              {senderId === userInfo.id && (
                <>
                  {/* <li className="chat-box-item__action-item">
                    <FaCheckDouble />
                    Đã xem
                  </li> */}
                  <li
                    className="chat-box-item__action-item"
                    onClick={handleRevokedMessage}
                  >
                    <FaUndo />
                    Thu hồi
                  </li>
                </>
              )}
              <li
                className="chat-box-item__action-item"
                onClick={handleDeleteMessage}
              >
                <FaTrashAlt />
                Xoá
              </li>
            </ul>
          </div>
        )}
        <span className="chat-box-item__mess">
          {message ?? "Không có nội dung"}
        </span>
      </div>
    </div>
  );
};

export default ChatBoxItem;

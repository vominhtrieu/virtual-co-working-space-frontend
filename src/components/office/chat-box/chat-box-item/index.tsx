import { useEffect, useRef, useState } from "react";
import { FaCheckDouble, FaTrashAlt, FaUndo } from "react-icons/fa";
import { useAppSelector } from "../../../../stores";
import { socketSelector } from "../../../../stores/socket-slice";
import { ChatBoxItemPropsInterface } from "./types";

const srcTemp = "https://ss-images.saostar.vn/2020/01/03/6750639/page1.jpg";

const ChatBoxItem = (props: ChatBoxItemPropsInterface) => {
  const [isOpenAction, setIsOpenAction] = useState(false);
  const { src, alt, message, isMe, conversationId, id } = props;
  const actionRef = useRef<HTMLDivElement>(null);

  const socket = useAppSelector(socketSelector.getSocket);

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
      <img src={src ?? srcTemp} alt={alt} className="chat-box-item__avatar" />
      <div
        className="chat-box-item__message"
        onClick={() => {
          if (isMe) setIsOpenAction((curr) => !curr);
        }}
        onBlur={() => {
          if (isMe) setIsOpenAction(false);
        }}
      >
        {isOpenAction && (
          <div className="chat-box-item__action" ref={actionRef}>
            <ul className="chat-box-item__action-list">
              <li className="chat-box-item__action-item">
                <FaCheckDouble />
                Đã xem
              </li>
              <li
                className="chat-box-item__action-item"
                onClick={handleRevokedMessage}
              >
                <FaUndo />
                Thu hồi
              </li>
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
        <span>
          {message ?? "sadgasasdgasdgasdgehas ă gwe vgaeg he ae hah eah gset"}
        </span>
      </div>
    </div>
  );
};

export default ChatBoxItem;

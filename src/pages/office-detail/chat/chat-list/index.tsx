import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import ChatListItem from "./chat-list-item";
import { ChatListPropsInterface } from "./types";

const ChatList = (props: ChatListPropsInterface) => {
  const { isOpen, onToggled, onClose } = props;
  return (
    <div className='chat-list'>
      <div className='chat-list__title' onClick={onToggled}>
        Chat List
        {isOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
      </div>

      {isOpen && (
        <ul className='chat-list__items'>
          <li
            className='chat-list__item'
            onClick={() => {
              onClose();
            }}
          >
            <ChatListItem />
          </li>
          <li
            className='chat-list__item'
            onClick={() => {
              onClose();
            }}
          >
            <ChatListItem />
          </li>
          <li
            className='chat-list__item'
            onClick={() => {
              onClose();
            }}
          >
            <ChatListItem />
          </li>
        </ul>
      )}
    </div>
  );
};

export default ChatList;

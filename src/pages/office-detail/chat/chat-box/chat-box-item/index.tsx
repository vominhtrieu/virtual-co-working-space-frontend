import { ChatBoxItemPropsInterface } from "./types";

const srcTemp = "https://ss-images.saostar.vn/2020/01/03/6750639/page1.jpg";

const ChatBoxItem = (props: ChatBoxItemPropsInterface) => {
  const { src, alt, message, isMe } = props;

  return (
    <div className={"chat-box-item" + (isMe ? " mine" : "")}>
      <img src={src ?? srcTemp} alt={alt} className='chat-box-item__avatar' />
      <div className='chat-box-item__message'>
        {message ?? "sadgasasdgasdgasdgehas ă gwe vgaeg he ae hah eah gset"}
      </div>
    </div>
  );
};

export default ChatBoxItem;

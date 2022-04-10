import InputText from "../../../../UI/form-controls/inputText";
import ChatBoxItem from "./chatBoxItem";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { ChatBoxPropsInterface, InputInterface } from "./types";
import { yupResolver } from "@hookform/resolvers/yup";
import { RiSendPlaneFill } from "react-icons/ri";

const ChatBox = (props: ChatBoxPropsInterface) => {
  const { isChatListOpen, submitMessage } = props;

  const schema = yup.object().shape({
    message: yup.string().required("Message is required"),
  });

  const { control, handleSubmit } = useForm<InputInterface>({
    defaultValues: {
      message: "",
    },
    resolver: yupResolver(schema),
  });

  const handleSendMess = (values) => {
    submitMessage(values);
  };

  return (
    <>
      <div className={"chat-box" + (!isChatListOpen ? " full-height" : "")}>
        <div className='chat-box__title'>Nguyen Van A</div>

        <div className='chat-box__content'>
          <ul className='chat-box__items'>
            <li className='chat-box__item'>
              <ChatBoxItem />
            </li>
            <li className='chat-box__item'>
              <ChatBoxItem isMe />
            </li>
          </ul>
        </div>
      </div>
      <form className='chat-box__form' onSubmit={handleSubmit(handleSendMess)}>
        <InputText
          size='large'
          name='message'
          control={control}
          placeholder='Write a message ...'
        />
        <button
          style={{
            backgroundColor: "transparent",
            outline: "none",
            border: "none",
          }}
        >
          <RiSendPlaneFill className='chat-box__icon-send' />
        </button>
      </form>
    </>
  );
};

export default ChatBox;

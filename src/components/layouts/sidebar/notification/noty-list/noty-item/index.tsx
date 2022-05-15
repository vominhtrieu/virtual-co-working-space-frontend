import { ItemPropsInterface } from './types';

const srcTemp = "https://ss-images.saostar.vn/2020/01/03/6750639/page1.jpg";

const NotyItem = (props: ItemPropsInterface) => {
  const { src, alt, name, isRead, time, notiMsg } = props;

  return (
    <div className='chat-list-item'>
      <img src={src ?? srcTemp} alt={alt} className='chat-list-item__img' />

      <div className='chat-list-item__content'>
        <div className='chat-list-item__name'>
          {name ?? "Nguyen Van A"}
          <div
            className={"chat-list-item__status" + (isRead ? " onl" : " off")}
          />
        </div>
        <div className='chat-list-item__last-message'>
          {notiMsg ?? "Hello, how are you?"}
          {!isRead && (
            <span className='chat-list-item__time'>{time ?? "10h"}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotyItem;

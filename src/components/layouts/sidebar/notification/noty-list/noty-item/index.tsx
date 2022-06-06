import { ItemPropsInterface } from "./types";

const srcTemp =
  "https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg";

const NotyItem = (props: ItemPropsInterface) => {
  const { src, alt, name, isRead, time, notiMsg } = props;

  return (
    <div className="chat-list-item">
      <img src={src ?? srcTemp} alt={alt} className="chat-list-item__img" />

      <div className="chat-list-item__content">
        <div className="chat-list-item__name">
          {name ?? "Nguyen Van A"}
          <div
            className={"chat-list-item__status" + (isRead ? " onl" : " off")}
          />
        </div>
        <div className="chat-list-item__last-message">
          {notiMsg ?? "Hello, how are you?"}
          {!isRead && (
            <span className="chat-list-item__time">{time ?? "10h"}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotyItem;

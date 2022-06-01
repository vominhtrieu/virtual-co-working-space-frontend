import { FaWrench } from "react-icons/fa";
import { MemberItemProps } from "./types";

const MemberItem = (props: MemberItemProps) => {
  const { avatarUrl, userName, userId, role, isOnline, onClick } = props;

  const handleOpenSettingPopup = () => {
    onClick(userId);
  };

  return (
    <div className="member-item" onClick={handleOpenSettingPopup}>
      <div className="member-item__user-box">
        <div className="member-item__avatar">
          <img
            className="member-item__image"
            src={avatarUrl ?? "https://via.placeholder.com/150"}
            alt="avatar"
          />
          <span className={`member-item__online ${isOnline ? "onl" : "off"}`} />
        </div>

        <div className="member-item__user">
          <div className="member-item__name">{userName}</div>
          <div className="member-item__role">{role}</div>
        </div>
      </div>

      <div className="member-item__action">
        <FaWrench className="member-item__setting" />
      </div>
    </div>
  );
};

export default MemberItem;

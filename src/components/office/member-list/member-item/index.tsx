import { FaRegTrashAlt, FaWrench } from "react-icons/fa";
import { MemberItemProps } from "./types";

const MemberItem = (props: MemberItemProps) => {
  const { avatarUrl, userName, userId, role, isOnline, onClick, onKickMember } =
    props;

  const handleOpenSettingPopup = () => {
    onClick(userId);
  };

  const handleKickMember = () => {
    onKickMember(userId);
  };

  return (
    <div className="member-item">
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

      <div className="member-item__group-btn">
        <div className="member-item__action" onClick={handleKickMember}>
          <FaRegTrashAlt className="member-item__setting" />
        </div>
        <div className="member-item__action" onClick={handleOpenSettingPopup}>
          <FaWrench className="member-item__setting" />
        </div>
      </div>
    </div>
  );
};

export default MemberItem;

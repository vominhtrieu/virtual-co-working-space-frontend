import { useEffect, useState } from "react";
import { FaRegTrashAlt, FaWrench } from "react-icons/fa";
import { useAppSelector } from "../../../../stores";
import { userSelectors } from "../../../../stores/auth-slice";
import { MemberItemProps } from "./types";

const MemberItem = (props: MemberItemProps) => {
  const {
    avatarUrl,
    userName,
    userId,
    role,
    isOnline,
    onClick,
    onKickMember,
    officeDetail,
  } = props;

  const [isShowBtn, setIsShowBtn] = useState(false);

  const userInfo = useAppSelector(userSelectors.getUserInfo);

  useEffect(() => {
    const userMember = officeDetail.officeMembers.find(
      (member) => member.member.id === userInfo.id
    );

    const memberInfo = officeDetail.officeMembers.find(
      (member) => member.id === userId
    );

    if (!userMember || !memberInfo) return;

    if (
      (userMember?.roles[0].id === 1 || userMember?.roles[0].id === 2) &&
      memberInfo?.roles[0].id > userMember.roles[0].id
    ) {
      setIsShowBtn(true);
    }
  }, [officeDetail.officeMembers, userId, userInfo.id]);

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

      {isShowBtn && (
        <div className="member-item__group-btn">
          <div className="member-item__action" onClick={handleKickMember}>
            <FaRegTrashAlt className="member-item__setting" />
          </div>
          <div className="member-item__action" onClick={handleOpenSettingPopup}>
            <FaWrench className="member-item__setting" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberItem;

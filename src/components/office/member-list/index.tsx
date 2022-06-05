import { useState } from "react";
import { useAppSelector } from "../../../stores";
import { userSelectors } from "../../../stores/auth-slice";
import RightBar from "../../layouts/rightbar";
import ChangeRoleForm from "./change-role-form";
import MemberItem from "./member-item";
import { MemberListProps } from "./types";

const MemberList = (props: MemberListProps) => {
  const { onClose, officeDetail } = props;
  const [isChangeRole, setIsChangeRole] = useState(false);

  const userInfo = useAppSelector(userSelectors.getUserInfo);

  const handleOpenSettingPopup = (memberId: number) => {
    if (memberId !== userInfo.id) {
      setIsChangeRole(true);
    }
  };

  const handleChangeRole = (userId: number) => {
    console.log(userId);
  };

  return (
    <RightBar onClose={onClose}>
      {isChangeRole && (
        <ChangeRoleForm
          onClose={() => setIsChangeRole(false)}
          onSubmit={handleChangeRole}
        />
      )}
      {officeDetail?.officeMembers?.map((member) => {
        return (
          <MemberItem
            key={member.member.id}
            userId={member.member.id}
            userName={member.member.name}
            avatarUrl={member.member.avatar}
            role={
              member.member.id === officeDetail.createdBy.id
                ? "owner"
                : "member"
            }
            isOnline
            onClick={() => handleOpenSettingPopup(member.member.id)}
          />
        );
      })}
    </RightBar>
  );
};

export default MemberList;

import { useState } from "react";
import RightBar from "../../layouts/rightbar";
import ChangeRoleForm from "./change-role-form";
import MemberItem from "./member-item";
import { MemberListProps } from "./types";

const MemberList = (props: MemberListProps) => {
  const { onClose, officeDetail } = props;
  const [isChangeRole, setIsChangeRole] = useState(false);

  const handleOpenSettingPopup = () => {
    setIsChangeRole(true);
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
            onClick={handleOpenSettingPopup}
          />
        );
      })}
    </RightBar>
  );
};

export default MemberList;

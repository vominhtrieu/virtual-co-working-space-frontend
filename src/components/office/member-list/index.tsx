import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../stores";
import { userSelectors } from "../../../stores/auth-slice";
import RightBar from "../../layouts/rightbar";
import ChangeRoleForm from "./change-role-form";
import MemberItem from "./member-item";
import { MemberListProps } from "./types";

const MemberList = (props: MemberListProps) => {
  const { onClose, officeDetail } = props;
  const [isChangeRole, setIsChangeRole] = useState(false);
  const { t } = useTranslation();

  const userInfo = useAppSelector(userSelectors.getUserInfo);

  const handleOpenSettingPopup = () => {
    if (officeDetail.createdBy.id === userInfo.id) {
      setIsChangeRole(true);
    }
  };

  const handleChangeRole = (userId: number) => {
    console.log(userId);
  };

  return (
    <RightBar onClose={onClose} title={t("pages.office.memberList.title")}>
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
                ? t("pages.office.memberList.owner")
                : t("pages.office.memberList.member")
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

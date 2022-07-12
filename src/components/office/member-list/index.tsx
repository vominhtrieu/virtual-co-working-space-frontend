import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toastError } from "../../../helpers/toast";
import { ChangeRole } from "../../../services/api/offices/change-role";
import { KickMember } from "../../../services/api/offices/kick-member";
import RightBar from "../../layouts/rightbar";
import ChangeRoleForm from "./change-role-form";
import KickMemberForm from "./kick-member-form";
import MemberItem from "./member-item";
import { MemberListProps } from "./types";

const MemberList = (props: MemberListProps) => {
  const { onClose, officeDetail, onRefetchData } = props;
  const [memberSelected, setMemberSelected] = useState(0);
  const [isChangeRole, setIsChangeRole] = useState(false);
  const [isKickMember, setIsKickMember] = useState(false);
  const { t } = useTranslation();

  const handleOpenSettingPopup = (memberId: number) => {
    setMemberSelected(memberId);

    setIsChangeRole(true);
  };

  const handleOpenKickMemberPopup = (memberId: number) => {
    setMemberSelected(memberId);

    setIsKickMember(true);
  };

  const handleChangeRole = (role: number) => {
    ChangeRole({
      officeId: officeDetail?.id,
      memberId: memberSelected,
      roleId: role,
    })
      .then((res) => {
        if (res.code !== 200) {
          toastError(t(`error.${res.message}`) ?? "Thay đổi vai trò thất bại");
        }

        if (res.code === 200) {
          onRefetchData();
        }
      })
      .catch((err) => {
        console.log(err);
        toastError("Thay đổi vai trò thất bại");
      });
  };

  const handleKickMember = () => {
    KickMember({ officeId: officeDetail?.id, memberId: memberSelected })
      .then((res) => {
        if (res.code !== 200) {
          toastError(t(`error.${res.message}`) ?? "Đuổi thành viên thất bại");
        }

        if (res.code === 200) {
          onRefetchData();
        }
      })
      .catch((err) => {
        console.log(err);
        toastError("Đuổi thành viên thất bại");
      });
  };

  return (
    <RightBar onClose={onClose} title={t("pages.office.memberList.title")}>
      {isChangeRole && (
        <ChangeRoleForm
          onClose={() => setIsChangeRole(false)}
          onSubmit={handleChangeRole}
        />
      )}
      {isKickMember && (
        <KickMemberForm
          onClose={() => setIsKickMember(false)}
          onSubmit={handleKickMember}
        />
      )}
      {officeDetail?.officeMembers?.map((member) => {
        return (
          <MemberItem
            key={member?.id}
            userId={member?.id}
            userName={member.member.name}
            avatarUrl={member.member.avatar}
            role={t(
              `pages.office.memberList.${
                member?.roles[member?.roles?.length - 1].name
              }`
            )}
            isOnline={member.onlineStatus === "online"}
            onClick={handleOpenSettingPopup}
            onKickMember={handleOpenKickMemberPopup}
            officeDetail={officeDetail}
          />
        );
      })}
    </RightBar>
  );
};

export default MemberList;

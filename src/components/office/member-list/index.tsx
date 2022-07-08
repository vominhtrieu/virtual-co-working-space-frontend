import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toastError } from "../../../helpers/toast";
import { ChangeRole } from "../../../services/api/offices/change-role";
import { KickMember } from "../../../services/api/offices/kick-member";
import { useAppSelector } from "../../../stores";
import { userSelectors } from "../../../stores/auth-slice";
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

  const userInfo = useAppSelector(userSelectors.getUserInfo);

  const handleOpenSettingPopup = (memberId: number) => {
    setMemberSelected(memberId);

    const userMember = officeDetail.officeMembers.find(
      (member) => member.member.id === userInfo.id
    );

    const memberInfo = officeDetail.officeMembers.find(
      (member) => member.member.id === memberId
    );

    if (!userMember || !memberInfo) return;

    if (
      (userMember?.roles[0].id === 1 || userMember?.roles[0].id === 2) &&
      memberInfo?.roles[0].id > userMember.roles[0].id
    ) {
      setIsChangeRole(true);
    }
  };
  const handleOpenKickMemberPopup = (memberId: number) => {
    setMemberSelected(memberId);
    const userMember = officeDetail.officeMembers.find(
      (member) => member.member.id === userInfo.id
    );

    const memberInfo = officeDetail.officeMembers.find(
      (member) => member.member.id === memberId
    );

    if (!userMember || !memberInfo) return;

    if (
      (userMember?.roles[0].id === 1 || userMember?.roles[0].id === 2) &&
      memberInfo?.roles[0].id > userMember.roles[0].id
    ) {
      setIsKickMember(true);
    }
  };

  const handleChangeRole = (role: number) => {
    ChangeRole({
      officeId: officeDetail.id,
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
    KickMember({ officeId: officeDetail.id, memberId: memberSelected })
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
            key={member.member.id}
            userId={member.member.id}
            userName={member.member.name}
            avatarUrl={member.member.avatar}
            role={t(`pages.office.memberList.${member.roles[0].name}`)}
            isOnline={member.onlineStatus === "online"}
            onClick={handleOpenSettingPopup}
            onKickMember={handleOpenKickMemberPopup}
          />
        );
      })}
    </RightBar>
  );
};

export default MemberList;

import { useEffect, useState } from "react";
import { toastError } from "../../../helpers/toast";
import OfficeDetailProxy from "../../../services/proxy/offices/office-detail";
import { useAppSelector } from "../../../stores";
import { userSelectors } from "../../../stores/auth-slice";
import { ProxyStatusEnum } from "../../../types/http/proxy/ProxyStatus";
import RightBar from "../../layouts/rightbar";
import { OfficeDetailInterface } from "../../office-detail-form/types";
import MemberItem from "./member-item";
import { MemberListProps } from "./types";

const MemberList = (props: MemberListProps) => {
  const [officeDetail, setOfficeDetail] = useState<OfficeDetailInterface>();
  const { onClose, id } = props;

  const userInfo = useAppSelector(userSelectors.getUserInfo);

  useEffect(() => {
    OfficeDetailProxy({ id: id })
      .then((res) => {
        if (res.status === ProxyStatusEnum.FAIL) {
          toastError(res.message ?? "Get offices detail fail");
          return;
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          setOfficeDetail(res.data.office ?? {});
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <RightBar onClose={onClose}>
      {officeDetail?.officeMembers?.map((member) => {
        return (
          <MemberItem
            key={member.member.id}
            userId={member.member.id}
            userName={member.member.name}
            avatarUrl={member.member.avatar}
            role={member.member.id === userInfo.id ? "owner" : "member"}
            isOnline
          />
        );
      })}
    </RightBar>
  );
};

export default MemberList;

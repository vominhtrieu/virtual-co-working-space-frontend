import RightBar from "../../layouts/rightbar";
import MemberItem from "./member-item";
import { MemberListProps } from "./types";

const MemberList = (props: MemberListProps) => {
  const { onClose, officeDetail } = props;

  return (
    <RightBar onClose={onClose}>
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
          />
        );
      })}
    </RightBar>
  );
};

export default MemberList;

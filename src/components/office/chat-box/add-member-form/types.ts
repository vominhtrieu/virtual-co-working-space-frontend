import { OfficeMembersInterface } from "../../../../services/api/offices/office-detail/types";

export interface AddMemberConversationFormProps {
  onClose: () => void;
  onSubmit: (values) => void;
  memberList: OfficeMembersInterface[];
}

export interface AddMemberConversationFormInput {
  userList: string[];
}

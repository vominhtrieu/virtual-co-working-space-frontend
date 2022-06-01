import { OfficeMembersInterface } from "../../../../services/api/offices/office-detail/types";

export interface CreateConversationFormProps {
  onClose: () => void;
  onSubmit: (values) => void;
  memberList: OfficeMembersInterface[];
}

export interface CreateConversationFormInput {
  name: string;
  userList: string[];
}

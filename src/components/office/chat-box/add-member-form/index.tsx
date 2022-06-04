import { useState } from "react";
import Popup from "../../../UI/popup";
import SelectItem from "../../../UI/select-item";
import { AddMemberConversationFormProps } from "./types";

const AddMemberConversationForm = (props: AddMemberConversationFormProps) => {
  const { onClose, onSubmit, memberList } = props;
  const [memberSelectedList, setMemberSelectedList] = useState<number[]>([]);

  const handleAddMemberConversationSubmit = () => {
    const formValues = {
      memberIds: memberSelectedList,
    };

    onSubmit(formValues);
    onClose();
  };

  const handleSelectMember = (memberId: number) => {
    if (memberSelectedList.includes(memberId)) {
      setMemberSelectedList(memberSelectedList.filter((id) => id !== memberId));
    } else {
      setMemberSelectedList([...memberSelectedList, memberId]);
    }
  };

  return (
    <Popup
      title="Thêm thành viên"
      onClose={onClose}
      onSubmit={handleAddMemberConversationSubmit}
      type="dark"
      hasFooter
    >
      <div className="create-conversation-form__select-member">
        {memberList.map((member, index) => {
          return (
            <SelectItem
              avatar={member.member.avatar}
              content={member.member.name}
              value={member.member.id}
              key={index}
              onClick={handleSelectMember}
              isSelected={memberSelectedList.includes(member.member.id)}
            />
          );
        })}
      </div>
    </Popup>
  );
};

export default AddMemberConversationForm;

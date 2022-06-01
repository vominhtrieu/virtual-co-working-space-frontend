import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Popup from "../../../UI/popup";
import {
  CreateConversationFormInput,
  CreateConversationFormProps,
} from "./types";
import * as yup from "yup";
import InputText from "../../../UI/form-controls/input-text";
import SelectItem from "../../../UI/select-item";
import { useState } from "react";

const CreateConversationForm = (props: CreateConversationFormProps) => {
  const { onClose, onSubmit, memberList } = props;
  const [memberSelectedList, setMemberSelectedList] = useState<number[]>([]);

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
  });

  const { control, handleSubmit } = useForm<CreateConversationFormInput>({
    defaultValues: {
      name: "",
    },
    resolver: yupResolver(schema),
  });

  const handleCreateConversationSubmit = (values) => {
    const formValues = {
      ...values,
      memberIds: memberSelectedList,
    };

    onSubmit(formValues);
  };

  const handleSelectMember = (memberId: number) => {
    if (memberSelectedList.includes(memberId)) {
      setMemberSelectedList(memberSelectedList.filter((id) => id !== memberId));
    } else {
      setMemberSelectedList([...memberSelectedList, memberId]);
    }
  };

  return (
    <Popup title="Tạo hội thoại" onClose={onClose} type="dark" hasFooter>
      <form onSubmit={handleSubmit(handleCreateConversationSubmit)}>
        <div className="create-conversation-form__input-block">
          <InputText
            name="name"
            control={control}
            hasLabel
            label="Tên hội thoại"
          />
        </div>
        <br />

        {memberList.map((member, index) => {
          return (
            <SelectItem
              content={member.member.name}
              value={member.member.id}
              key={index}
              onClick={handleSelectMember}
              isSelected={memberSelectedList.includes(member.member.id)}
            />
          );
        })}
      </form>
    </Popup>
  );
};

export default CreateConversationForm;

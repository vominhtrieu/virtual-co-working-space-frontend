import { Radio, RadioChangeEvent } from "antd";
import React, { useState } from "react";
import Popup from "../../../UI/popup";
import { ChangeRoleFormProps } from "./types";

const ChangeRoleForm = (props: ChangeRoleFormProps) => {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const { onClose, onSubmit } = props;

  const handleCreateConversationSubmit = () => {
    onSubmit(value);
    onClose();
  };

  return (
    <Popup
      title="Thay đổi vai trò"
      onClose={onClose}
      onSubmit={handleCreateConversationSubmit}
      type="dark"
      hasFooter
    >
      <Radio.Group onChange={onChange} value={value}>
        <Radio value={1}>Owner</Radio>
        <Radio value={2}>Admin</Radio>
        <Radio value={3}>Member</Radio>
      </Radio.Group>
    </Popup>
  );
};

export default ChangeRoleForm;

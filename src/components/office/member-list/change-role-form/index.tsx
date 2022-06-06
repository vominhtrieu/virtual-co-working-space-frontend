import { Radio, RadioChangeEvent } from "antd";
import React, { useState } from "react";
import Popup from "../../../UI/popup";
import { ChangeRoleFormProps } from "./types";

const ChangeRoleForm = (props: ChangeRoleFormProps) => {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
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
        <Radio value={1}>
          <span className="text-white">Owner</span>
        </Radio>
        <Radio value={2}>
          <span className="text-white">Admin</span>
        </Radio>
        <Radio value={3}>
          <span className="text-white">Member</span>
        </Radio>
      </Radio.Group>
    </Popup>
  );
};

export default ChangeRoleForm;

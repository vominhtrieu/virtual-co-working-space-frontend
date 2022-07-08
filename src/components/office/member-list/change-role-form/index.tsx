import { Radio, RadioChangeEvent } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Popup from "../../../UI/popup";
import { ChangeRoleFormProps } from "./types";

const ChangeRoleForm = (props: ChangeRoleFormProps) => {
  const [value, setValue] = useState(2);
  const { t } = useTranslation();

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
      title={t("pages.office.memberList.changeRole")}
      onClose={onClose}
      onSubmit={handleCreateConversationSubmit}
      type="dark"
      hasFooter
    >
      <Radio.Group onChange={onChange} value={value}>
        <Radio value={2}>
          <span className="text-white">
            {t("pages.office.memberList.ADMIN")}
          </span>
        </Radio>
        <Radio value={3}>
          <span className="text-white">
            {t("pages.office.memberList.MEMBER")}
          </span>
        </Radio>
      </Radio.Group>
    </Popup>
  );
};

export default ChangeRoleForm;

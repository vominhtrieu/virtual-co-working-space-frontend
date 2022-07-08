import { useTranslation } from "react-i18next";
import { FaCheck, FaSave, FaTimes } from "react-icons/fa";
import NewButton from "../../../UI/new-button";
import Popup from "../../../UI/popup";
import { KickMemberFormProps } from "./types";

const KickMemberForm = (props: KickMemberFormProps) => {
  const { t } = useTranslation();

  const { onClose, onSubmit } = props;

  const handleKickMemberSubmit = () => {
    onSubmit();
    onClose();
  };

  return (
    <Popup
      title={t("pages.office.memberList.kickMember")}
      onClose={onClose}
      onSubmit={handleKickMemberSubmit}
      type="dark"
    >
      <p className="member-item__warning">
        Bạn có muốn mời thành viên này ra khỏi phòng không?
      </p>

      <div className="member-item__group-btn">
        <NewButton
          type="reset"
          variant="outlined"
          onClick={onClose}
          content={t("default.action.no")}
          icon={<FaTimes />}
        />

        <div className="member-item__btn">
          <NewButton
            type="submit"
            variant="primary"
            content={t("default.action.yes")}
            onClick={handleKickMemberSubmit}
            icon={<FaCheck />}
          />
        </div>
      </div>
    </Popup>
  );
};

export default KickMemberForm;

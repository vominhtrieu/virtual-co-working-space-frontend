import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCopy } from "react-icons/fa";
import { toastSuccess } from "../../../helpers/toast";
import OfficeDetailProxy from "../../../services/proxy/offices/office-detail";
import { ProxyStatusEnum } from "../../../types/http/proxy/ProxyStatus";
import { ThumbnailPropsInterface } from "./types";

const srcTemp =
  "https://images.pexels.com/photos/5011647/pexels-photo-5011647.jpeg";

const Thumbnail = (props: ThumbnailPropsInterface) => {
  const { src, alt, office, onClick } = props;

  const { t } = useTranslation();

  const [memberTotal, setMemberTotal] = useState(0);
  const [online, setOnline] = useState(0);

  const formatName = (name: any) => {
    if (name.length > 17) return name.substr(0, 15) + "...";
    return name;
  };

  useEffect(() => {
    if (!office) return;

    OfficeDetailProxy({ id: office.id })
      .then((res) => {
        if (res.status === ProxyStatusEnum.FAIL) {
          return;
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          setMemberTotal(res.data.office.officeMembers.length);
          let countOnline = 0;
          res.data.office.officeMembers.forEach((member) => {
            if (member.onlineStatus === "online") countOnline++;
          });

          setOnline(countOnline);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [office]);

  const handleCopy = () => {
    if (!office) return;
    navigator.clipboard.writeText(office.invitationCode);

    toastSuccess("Copied to clipboard");
  };

  return (
    <div
      className="thumbnail"
      style={{
        backgroundImage: `url("${src ? src : srcTemp}")`,
      }}
    >
      <div className="thumbnail__content">
        {/* header - start */}
        <div className="thumbnail__content-header">
          <span className="thumbnail__content-title" onClick={onClick}>
            {formatName(office?.name)}
          </span>
          <div className="thumbnail__content-count">
            <span className="thumbnail__content-active" />
            <span className="thumbnail__content-num">
              {memberTotal > 0 ? `${online}/${memberTotal}` : "-/-"}
            </span>
          </div>
        </div>
        {/* header - end */}

        <div className="thumbnail__content-item">
          <span className="thumbnail__content-label">
            {t("pages.lobby.code")}:{" "}
          </span>
          <span className="thumbnail__content-value">
            {office?.invitationCode}
          </span>
          <FaCopy className="thumbnail__content-icon" onClick={handleCopy} />
        </div>

        <div className="thumbnail__content-item">
          <span className="thumbnail__content-label">
            {t("pages.lobby.owner")}:{" "}
          </span>
          <span className="thumbnail__content-value">
            {office?.createdBy?.name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Thumbnail;

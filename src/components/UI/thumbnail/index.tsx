import { useEffect, useState } from "react";
import { FaCopy } from "react-icons/fa";
import OfficeDetailProxy from "../../../services/proxy/offices/office-detail";
import { ProxyStatusEnum } from "../../../types/http/proxy/ProxyStatus";
import { ThumbnailPropsInterface } from "./types";

const srcTemp = "https://ss-images.saostar.vn/2020/01/03/6750639/page1.jpg";

const Thumbnail = (props: ThumbnailPropsInterface) => {
  const { src, alt, office, onClick } = props;

  const [memberTotal, setMemberTotal] = useState(0);
  const [online, setOnline] = useState(0);

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

  return (
    <div className="thumbnail">
      <img
        src={src ?? srcTemp}
        alt={alt}
        className="thumbnail__img"
        onClick={onClick}
      />
      <div className="thumbnail__content">
        {/* header - start */}
        <div className="thumbnail__content-header">
          <span className="thumbnail__content-title" onClick={onClick}>
            {office?.name}
          </span>
          <div className="thumbnail__content-count">
            <span className="thumbnail__content-active" />
            {memberTotal > 0 && (
              <span className="thumbnail__content-num">
                {online}/{memberTotal}
              </span>
            )}
          </div>
        </div>
        {/* header - end */}

        <div className="thumbnail__content-item">
          <span className="thumbnail__content-label">Mã phòng: </span>
          <span className="thumbnail__content-value">
            {office?.invitationCode}
          </span>
          <FaCopy className="thumbnail__content-icon" />
        </div>

        <div className="thumbnail__content-item">
          <span className="thumbnail__content-label">Người tạo: </span>
          <span className="thumbnail__content-value">
            {office?.createdBy?.name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Thumbnail;

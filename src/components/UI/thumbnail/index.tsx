import { FaCopy } from "react-icons/fa";
import { ThumbnailPropsInterface } from "./types";

const srcTemp = "https://ss-images.saostar.vn/2020/01/03/6750639/page1.jpg";

const Thumbnail = (props: ThumbnailPropsInterface) => {
  const { src, alt, office, onClick } = props;

  const formatTitle = (title: any) => {
    // if (title.length > 50) 
    //   return title.substring(0, 50) + "...";
    return title;
  }

  return (
    <div className="thumbnail" onClick={onClick}>
      <img src={src ?? srcTemp} alt={alt} className="thumbnail__img" />
      <div className="thumbnail__content">
        {/* header - start */}
        <div className="thumbnail__content-header">
          <p className="thumbnail__content-title">{formatTitle(office?.name)}</p>
          <div className="thumbnail__content-count">
            <span className="thumbnail__content-active" />
            <span className="thumbnail__content-num">5/20</span>
          </div>
        </div>
        {/* header - end */}

        <div className="thumbnail__content-item">
          <span className="thumbnail__content-label">Mã phòng: </span>
          <span className="thumbnail__content-value">{office?.invitationCode}</span>
          <FaCopy className="thumbnail__content-icon" />
        </div>

        <div className="thumbnail__content-item">
          <span className="thumbnail__content-label">Người tạo: </span>
          <span className="thumbnail__content-value">{office?.createdBy?.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Thumbnail;

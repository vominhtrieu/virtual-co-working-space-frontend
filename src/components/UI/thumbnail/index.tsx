import { FaCopy } from "react-icons/fa";
import { ThumbnailPropsInterface } from "./types";

const srcTemp = "https://ss-images.saostar.vn/2020/01/03/6750639/page1.jpg";

const Thumbnail = (props: ThumbnailPropsInterface) => {
  const { src, alt, title, onClick } = props;
  return (
    <div className="thumbnail" onClick={onClick}>
      <img src={src ?? srcTemp} alt={alt} className="thumbnail__img" />
      <div className="thumbnail__content">
        {/* header - start */}
        <div className="thumbnail__content-header">
          <span className="thumbnail__content-title">{title}</span>
          <div className="thumbnail__content-count">
            <span className="thumbnail__content-active" />
            <span className="thumbnail__content-num">5/20</span>
          </div>
        </div>
        {/* header - end */}

        <div className="thumbnail__content-item">
          <span className="thumbnail__content-label">Mã phòng: </span>
          <span className="thumbnail__content-value">564G5SDG6</span>
          <FaCopy className="thumbnail__content-icon" />
        </div>

        <div className="thumbnail__content-item">
          <span className="thumbnail__content-label">Người tạo: </span>
          <span className="thumbnail__content-value">Võ Minh Triều</span>
        </div>

        <div className="thumbnail__content-item">
          <span className="thumbnail__content-label">Mô tả: </span>
          <span className="thumbnail__content-value">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            voluptates praesentium omnis eaque tempora ...
          </span>
        </div>
      </div>
    </div>
  );
};

export default Thumbnail;

import { ThumbnailPropsInterface } from "./types";

const srcTemp = "https://ss-images.saostar.vn/2020/01/03/6750639/page1.jpg";

const Thumbnail = (props: ThumbnailPropsInterface) => {
  const { src, alt, title, onClick } = props;
  return (
    <div className='thumbnail' onClick={onClick}>
      <img src={src ?? srcTemp} alt={alt} className='thumbnail__img' />
      <div className='thumbnail__content'>{title}</div>
    </div>
  );
};

export default Thumbnail;

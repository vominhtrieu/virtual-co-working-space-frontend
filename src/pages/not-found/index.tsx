import NotFoundImage from "../../assets/images/404.gif";

const NotFound = () => {
  return (
    <div className="not-found">
      <img src={NotFoundImage} alt="#" className="not-found__img" />
    </div>
  );
};

export default NotFound;

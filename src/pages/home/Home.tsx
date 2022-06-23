import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/UI/button";
import imgsrc from "../../assets/images/Saly-10.png";
import DarkLogo from "../../assets/images/DarkLogo.png";
import NewButton from "../../components/UI/new-button";
import { FaSignInAlt } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();

  return (
    <section className="container">
      <div className="home__header">
        <div className="navbar__brand" onClick={() => navigate("/lobby")}>
          <img src={DarkLogo} alt="" className="navbar__logo_img" />
          <h1>iSpace</h1>
        </div>

        <div className="home__action">
          <Link to={"/auth/login"}>Đăng nhập</Link>
          <Link to={"/auth/register"}>Đăng ký</Link>
        </div>
      </div>
      <div className="slide">
        <div className="slide__content">
          <h1 className="slide__header">
            Làm việc và giải trí ngay cả khi bạn đang ở nhà!
          </h1>
          <p className="slide__sub">Tạo văn phòng riêng cho nhóm của bạn.</p>
          <Button
            variant="primary"
            onClick={() => {
              navigate("/auth/login");
            }}
          >
            Tham gia ngay
          </Button>
        </div>

        <div className="slide__image">
          <img src={imgsrc} alt="" />
        </div>
      </div>

      {/* <div className="features"></div> */}
    </section>
  );
};

export default Home;

import { HiOutlineVideoCamera } from "react-icons/hi";
import { MdChatBubbleOutline, MdOutlineScreenShare } from "react-icons/md";
import { FaRegBuilding, FaRegHandScissors, FaRegUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import aboutImage from "../../assets/images/about-img1.jpg";
import DarkLogo from "../../assets/images/DarkLogo.png";
import imgsrc from "../../assets/images/Saly-10.png";
import Button from "../../components/UI/button";
import hhvtImg from "../../assets/images/team/HHVT.jpg";
import nhtImg from "../../assets/images/team/NHT.png";

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

      <div className="home__block--white">
        <div className="home__our-story">
          <img src={aboutImage} alt="" className="our-story__image" />
          <div className="our-story__content">
            <div className="our-story__header">
              Ý tưởng ban đầu
            </div>
            <div className="our-story__title">
              Văn phòng tại nhà
            </div>
            <div className="our-story__text">
              Những năm gần đây, do ảnh hưởng của dịch Covid-19, việc sử dụng các ứng dụng làm việc, học trực tuyến trở thành lựa chọn hàng đầu cho các doanh nghiệp và trường học trong bối cảnh giãn cách. Bắt kịp xu thế đó, nhóm nãy ra ý tưởng làm nền tảng mô phỏng văn phòng 3D cho phép xây dựng một không gian học tập và làm việc ảo cho riêng người dùng. Mọi người có thể trò chuyện, tương tác với nhau để tránh nhàm chán khi làm việc, học tập trực tuyến.
            </div>
          </div>
        </div>
      </div>

      <div className="home__block--white">
        <div className="home__services">
          <div className="services__header">
            Tính năng
          </div>

          <div className="services__list">
            <div className="services__item">
              <div className="services__icon-box">
                <FaRegUser className="services__icon" />
              </div>

              <div className="services__title">Tạo nhân vật</div>
              <div className="services__content">
                Người dùng khi tham gia vào hệ thống sẽ có một nhân vật riêng và có thể tuỳ chỉnh nhân vật theo sở thích của bản thân.
              </div>
            </div>
            <div className="services__item">
              <div className="services__icon-box">
                <FaRegBuilding className="services__icon" />
              </div>

              <div className="services__title">Tạo văn phòng</div>
              <div className="services__content">
                Người dùng có thể tạo văn phòng và thoả sức sáng tạo, trang trí văn phòng bằng các đồ dùng có sẵn.
              </div>
            </div>
            <div className="services__item">
              <div className="services__icon-box">
                <FaRegHandScissors className="services__icon" />
              </div>

              <div className="services__title">Team building</div>
              <div className="services__content">
                Các thành viên có thể chơi các trò chơi với nhau để giải trí, giảm căng thẳng sau những giờ làm việc và tăng tính đoàn kết.
              </div>
            </div>
            <div className="services__item">
              <div className="services__icon-box">
                <HiOutlineVideoCamera className="services__icon" />
              </div>

              <div className="services__title">Video call</div>
              <div className="services__content">
                Các thành viên khi vào phòng có thể video call với nhau giúp họ cảm thấy gần gũi hơn dù cách xa địa lý.
              </div>
            </div>
            <div className="services__item">
              <div className="services__icon-box">
                <MdChatBubbleOutline className="services__icon" />
              </div>

              <div className="services__title">Tạo kênh trò chuyện</div>
              <div className="services__content">
                Có thể tạo ra nhiều kênh trò chuyện khác nhau để phù hợp với từng nhóm công việc.
              </div>
            </div>
            <div className="services__item">
              <div className="services__icon-box">
                <MdOutlineScreenShare className="services__icon" />
              </div>

              <div className="services__title">Chia sẻ màn hình</div>
              <div className="services__content">
                Chúng ta có thể trình chiếu màn hình để thuyết trình trong các buổi họp.
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="home__block--white">
        <div className="home__team">
          <div className="team__header">
            Thành viên
          </div>

          <div className="team__list">
            <a href="https://www.facebook.com/profile.php?id=100005642647089" target="_blank" rel="noreferrer">
              <div className="team__item">
                <img src="https://ca.slack-edge.com/T03ANC0U03Y-U03ANC2SP1U-4924160679fc-512" alt="" className="team__item-avt" />
                <div className="team__item-name">Nguyễn Lương Phương Thuỷ</div>
                <div className="team__item-student-id">18120587</div>
              </div>
            </a>
            <a href="https://www.facebook.com/tien.hohoang.7" target="_blank" rel="noreferrer">
              <div className="team__item">
                <img src={hhvtImg} alt="" className="team__item-avt" />
                <div className="team__item-name">Hồ Hoàng Việt Tiến</div>
                <div className="team__item-student-id">18120589</div>
              </div>
            </a>
            <a href="https://www.facebook.com/tricua2000" target="_blank" rel="noreferrer">
              <div className="team__item">
                <img src="https://i.imgur.com/HOrOyWz.jpeg" alt="" className="team__item-avt" />
                <div className="team__item-name">Nguyễn Đức Minh Trí </div>
                <div className="team__item-student-id">18120612</div>
              </div>
            </a>
            <a href="https://www.facebook.com/trieu.vm" target="_blank" rel="noreferrer">
              <div className="team__item">
                <img src="https://media-exp2.licdn.com/dms/image/C5603AQFrP-X0npnzng/profile-displayphoto-shrink_800_800/0/1648476924297?e=1661385600&v=beta&t=dRs8SnUMAAeHUvQ0AbjlZsgY94D4gzRXGniW_wESfIw" alt="" className="team__item-avt" />
                <div className="team__item-name">Võ Minh Triều</div>
                <div className="team__item-student-id">18120615</div>
              </div>
            </a>
            <a href="https://www.facebook.com/nh.trung227" target="_blank" rel="noreferrer">
              <div className="team__item">
                <img src="https://i.imgur.com/mw5hgaO.jpg" alt="" className="team__item-avt" />
                <div className="team__item-name">Nguyễn Hoàng Trung</div>
                <div className="team__item-student-id">18120623</div>
              </div>
            </a>
          </div>
        </div>
        <div className="license">Bản quyền thuộc về ViSpace Team</div>
      </div>
    </section>
  );
};

export default Home;

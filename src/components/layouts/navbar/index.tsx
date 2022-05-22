import { FaDoorClosed, FaPlus } from "react-icons/fa";
import NewButton from "../../UI/new-button";
import LogoVSpace from "../../../assets/images/VSpaceLogo.svg";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img src={LogoVSpace} alt="" className="navbar__logo-img" />
      </div>
      <div className="navbar__right-content">
        <div className="navbar__button">
          <NewButton variant="primary" content="Tạo phòng" icon={<FaPlus />} />
        </div>

        <div className="navbar__button">
          <NewButton
            variant="primary"
            content="Tham gia phòng"
            icon={<FaDoorClosed />}
          />
        </div>

        <div className="navbar__user">
          <img
            src="https://vcdn-giaitri.vnecdn.net/2022/04/28/Avatar-2-James-Cameron-5081-1651112580.jpg"
            alt=""
            className="navbar__avatar"
          />

          <div className="navbar__user-info">
            <span className="navbar__user-name">Võ Minh Triều</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

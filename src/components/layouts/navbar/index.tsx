import { FaDoorClosed, FaPlus } from "react-icons/fa";
import NewButton from "../../UI/new-button";
import LogoVSpace from "../../../assets/images/VSpaceLogo.svg";
import UserPopup from "../user-popup";

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

        <UserPopup/>
      </div>
    </nav>
  );
};

export default Navbar;

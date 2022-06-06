import { Input } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import DarkLogo from "../../../assets/images/DarkLogo.png";
import UserPopup from "../user-popup";
import { NavbarProps } from "./types";

const { Search } = Input;

const Navbar = (props: NavbarProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { onSubmit } = props;

  return (
    <>
      <nav className="navbar">
        <div className="navbar__brand" onClick={() => navigate("/lobby")}>
          <img src={DarkLogo} alt="" className="navbar__logo_img" />
          <h1>iSpace</h1>
        </div>

        {onSubmit && (
          <div className="navbar__search">
            <Search
              placeholder={t("pages.lobby.inputSearch")}
              onSearch={(value) => onSubmit(value)}
              style={{ width: 200 }}
            />
          </div>
        )}
        <div className="navbar__right-content">
          <UserPopup />
        </div>
      </nav>
    </>
  );
};

export default Navbar;

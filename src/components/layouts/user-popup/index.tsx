import { UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Menu } from "antd";
import MenuDivider from "antd/lib/menu/MenuDivider";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaSignOutAlt, FaTshirt, FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { removeAll } from "../../../helpers/cookies";
import { removeAllDataLocal } from "../../../helpers/localStorage";
import { useAppDispatch, useAppSelector } from "../../../stores";
import {
  setAuthenticated,
  setUserInfo,
  userSelectors,
} from "../../../stores/auth-slice";
import CharacterForm from "../../character-form";

const UserPopup = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userInfo = useAppSelector(userSelectors.getUserInfo);
  const [isCharacter, setIsCharacter] = useState(false);

  const { t } = useTranslation();

  const handleLogout = () => {
    dispatch(setAuthenticated(false));
    dispatch(setUserInfo({}));
    removeAllDataLocal();
    removeAll();
    navigate("/auth/login");
  };

  const handleClickProfile = () => {
    navigate("/profile");
  };

  const menu = (
    <Menu className="navbar__dropdown-menu">
      <Menu.Item className="navbar__dropdown-item" onClick={handleClickProfile}>
        <div className="navbar__dropdown-content-bottom">
          <div className="navbar__dropdown-item-icon">
            <FaUserAlt />
          </div>
          <p>{t("pages.lobby.userMenu.account")}</p>
        </div>
      </Menu.Item>
      <Menu.Item
        className="navbar__dropdown-item"
        onClick={() => setIsCharacter(true)}
      >
        <div className="navbar__dropdown-content-bottom">
          <div className="navbar__dropdown-item-icon">
            <FaTshirt />
          </div>
          <p>{t("pages.lobby.userMenu.editCharacter")}</p>
        </div>
      </Menu.Item>
      <MenuDivider />
      <Menu.Item className="navbar__dropdown-item" onClick={handleLogout}>
        <div className="navbar__dropdown-content-bottom">
          <div className="navbar__dropdown-item-icon">
            <FaSignOutAlt />
          </div>
          <p>{t("pages.lobby.userMenu.logout")}</p>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      {isCharacter && <CharacterForm onClose={() => setIsCharacter(false)} />}
      <Dropdown overlay={menu} placement="bottomRight">
        <div className="navbar__user">
          {userInfo.avatar === "" ? (
            <Avatar size={25} icon={<UserOutlined />} />
          ) : (
            <img src={userInfo.avatar} alt="" className="navbar__avatar" />
          )}
          <div className="navbar__user-info">
            <span className="navbar__user-name">{userInfo.name}</span>
          </div>
        </div>
      </Dropdown>
    </>
  );
};

export default UserPopup;

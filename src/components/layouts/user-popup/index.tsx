import { UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Menu } from "antd";
import MenuDivider from "antd/lib/menu/MenuDivider";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaSignOutAlt, FaTshirt, FaUserAlt,FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { removeAll } from "../../../helpers/cookies";
import { getDataLocal, removeAllDataLocal, saveDataLocal } from "../../../helpers/localStorage";
import UnsubcribeProxy from "../../../services/proxy/notification/unsubcribe";
import { useAppDispatch, useAppSelector } from "../../../stores";
import {
  setAuthenticated,
  setUserInfo,
  userSelectors,
} from "../../../stores/auth-slice";
import CharacterForm from "../../character-form";
import Setting from "./setting";
import { toastError, toastSuccess } from "../../../helpers/toast";
import { ProxyStatusEnum } from "../../../types/http/proxy/ProxyStatus";

const UserPopup = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userInfo = useAppSelector(userSelectors.getUserInfo);
  const [isCharacter, setIsCharacter] = useState(false);
  const [isSetting, setIsSetting] = useState(false);

  const { t } = useTranslation();

  const handleLogout = () => {
    UnsubcribeProxy({pushToken:getDataLocal("push_token")}) .then((res) => {  
      if (res.status === ProxyStatusEnum.FAIL) {
        toastError(t(`error.${res.message}`) ?? "");
      }
      // if (res.status === ProxyStatusEnum.SUCCESS) {
      //   saveDataLocal("push_token",res?.data?.pushToken);
      // }
    })
    .catch((err) => {

      toastError(t(`error.${err.message}`) ?? "Get offices fail");
    });
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
      <Menu.Item key="user" className="navbar__dropdown-item" onClick={handleClickProfile}>
        <div className="navbar__dropdown-content-bottom">
          <div className="navbar__dropdown-item-icon">
            <FaUserAlt />
          </div>
          <p>{t("pages.lobby.userMenu.account")}</p>
        </div>
      </Menu.Item>
      <Menu.Item key="character"
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
      <Menu.Item key="translate"
        className="navbar__dropdown-item"
        onClick={() => setIsSetting(true)}
      >
        <div className="navbar__dropdown-content-bottom">
          <div className="navbar__dropdown-item-icon">
            <FaCog />
          </div>
          <p>{t("pages.lobby.userMenu.setting")}</p>
        </div>
      </Menu.Item>
      <MenuDivider />
      <Menu.Item key="logout" className="navbar__dropdown-item" onClick={handleLogout}>
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
      {isSetting && <Setting onClose={() => setIsSetting(false)} />}
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

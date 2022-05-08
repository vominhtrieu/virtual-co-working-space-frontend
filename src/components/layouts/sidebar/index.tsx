import { UserOutlined } from "@ant-design/icons";
import { Avatar, Badge } from "antd";
import { useState } from "react";
import { BsFillChatFill } from "react-icons/bs";
import { FaBell } from "react-icons/fa";
import { MdMeetingRoom } from "react-icons/md";
import { RiLogoutBoxRFill, RiSettings4Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { removeAll } from "../../../helpers/cookies";
import { removeAllDataLocal } from "../../../helpers/localStorage";
import { toastError, toastSuccess } from "../../../helpers/toast";
import LogoutProxy from "../../../services/proxy/auth/logout";
import { useAppDispatch, useAppSelector } from "../../../stores";
import {
  setAuthenticated,
  setUserInfo,
  userSelectors,
} from "../../../stores/auth-slice";
import { setOpen, sidebarSelectors } from "../../../stores/sidebar-slice";
import { ProxyStatusEnum } from "../../../types/http/proxy/ProxyStatus";
import SidebarNotification from "./notification";
import Offices from "./offices";
import SidebarSettings from "./settings";
import SidebarUser from "./userInfo";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const [sidebarOpen, setSidebarOpen] = useState("");
  const currSidebar = useAppSelector(sidebarSelectors.getOpen);
  const navigate = useNavigate();
  const userInfo = useAppSelector(userSelectors.getUserInfo);

  const handleLogout = () => {
    LogoutProxy()
      .then((res) => {
        if (res.status === ProxyStatusEnum.FAIL) {
          toastError(res.message ?? "Logout fail");
          return;
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          toastSuccess("Logout success");
          dispatch(setAuthenticated(false));
          dispatch(setUserInfo({}));
          removeAllDataLocal();
          removeAll();
          navigate("/auth/login");
          return;
        }
      })
      .catch((err) => {
        toastError(err.message ?? "Logout fail");
      });
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <div className="sidebar__logo">VW</div>

        <div className="sidebar__menu">
          <ul className="sidebar__items">
            <li
              className={
                "sidebar__item" + (currSidebar === "character" ? " active" : "")
              }
              onClick={() =>
                setSidebarOpen((curr) => {
                  if (curr === "notify") {
                    dispatch(setOpen(""));
                    return "";
                  }
                  dispatch(setOpen("notify"));
                  return "notify";
                })
              }
            >
              <Badge count={2}>
                <FaBell className="sidebar__icon" />
              </Badge>
            </li>
            <li
              className={
                "sidebar__item" + (currSidebar === "office" ? " active" : "")
              }
              onClick={() =>
                setSidebarOpen((curr) => {
                  if (curr === "office") {
                    dispatch(setOpen(""));
                    return "";
                  }
                  dispatch(setOpen("office"));
                  return "office";
                })
              }
            >
              <MdMeetingRoom className="sidebar__icon" />
            </li>
          </ul>
        </div>

        <div className="sidebar__menu">
          <ul className="sidebar__items">
            <li
              className={
                "sidebar__item" + (currSidebar === "settings" ? " active" : "")
              }
              onClick={() =>
                setSidebarOpen((curr) => {
                  if (curr === "settings") {
                    dispatch(setOpen(""));
                    return "";
                  }
                  dispatch(setOpen("settings"));
                  return "settings";
                })
              }
            >
              <RiSettings4Fill className="sidebar__icon" />
            </li>

            <li
              className={
                "sidebar__item" + (currSidebar === "user" ? " active" : "")
              }
              onClick={() =>
                setSidebarOpen((curr) => {
                  if (curr === "user") {
                    dispatch(setOpen(""));
                    return "";
                  }
                  dispatch(setOpen("user"));
                  return "user";
                })
              }
            >
              <div className="sidebar__icon">
                {userInfo.avatar !== "" ? (
                  <Avatar src={userInfo.avatar} />
                ) : (
                  <Avatar icon={<UserOutlined />} />
                )}
              </div>
            </li>

            <li className={"sidebar__item"} onClick={handleLogout}>
              <RiLogoutBoxRFill className="sidebar__icon" />
            </li>
          </ul>
        </div>
      </div>

      {sidebarOpen === "settings" ? <SidebarSettings /> : null}
      {sidebarOpen === "user" ? <SidebarUser /> : null}
      {sidebarOpen === "office" ? <Offices /> : null}
      {sidebarOpen === "notify" ? <SidebarNotification /> : null}
    </div>
  );
};

export default Sidebar;

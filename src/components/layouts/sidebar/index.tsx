import { useState } from "react";
import { Avatar} from "antd";
import { BsFillChatFill } from "react-icons/bs";
import { MdMeetingRoom } from "react-icons/md";
import { RiSettings4Fill } from "react-icons/ri";
import Offices from "./offices";
import SidebarSettings from "./settings";
import SidebarUser from "./userInfo";
import { UserOutlined } from "@ant-design/icons";

import { setOpen } from "../../../stores/sidebar-slice";
import { useAppDispatch } from "../../../stores";
import { useAppSelector } from "../../../stores";
import { userSelectors } from "../../../stores/auth-slice";
const URL_TEMP =
  "https://64.media.tumblr.com/2b6c2343decf1534ebc6a735e9969819/ef2dfa173b9b5ca6-4f/s1280x1920/16822b4598c99673c8e55ad257dcb206dfb5c121.jpg";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const [sidebarOpen, setSidebarOpen] = useState("");
  const userInfo = useAppSelector(userSelectors.getUserInfo);

  console.log(userInfo);
  return (
    <div className='sidebar-container'>
      <div className='sidebar'>
        <div className='sidebar__logo'>VW</div>

        <div className='sidebar__menu'>
          <ul className='sidebar__items'>
            <li className='sidebar__item'>
              <BsFillChatFill className='sidebar__icon' />
            </li>
            <li className='sidebar__item'>
              <MdMeetingRoom
                className='sidebar__icon'
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
              />
            </li>
            <li
              className='sidebar__item'
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
              <RiSettings4Fill className='sidebar__icon' />
            </li>

            <div className='sidebar__bar-line' />

            <li
              className='sidebar__item'
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
              <div className='sidebar__user'>
              {userInfo.avatar!=="" ? (
        <Avatar size={40} src={userInfo.avatar} />
    ) : (
        <Avatar size={40} icon={<UserOutlined />} />
    )}
              </div>
            </li>
          </ul>
        </div>
      </div>

      {sidebarOpen === "settings" ? <SidebarSettings /> : null}
      {sidebarOpen === "user" ? <SidebarUser /> : null}
      {sidebarOpen === "office" ? <Offices /> : null}
    </div>
  );
};

export default Sidebar;

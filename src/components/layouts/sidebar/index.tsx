import { useState } from "react";
import { BsFillChatFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { RiSettings4Fill } from "react-icons/ri";
import SidebarSettings from "./settings";
import SidebarUser from "./userInfo";

const URL_TEMP =
  "https://64.media.tumblr.com/2b6c2343decf1534ebc6a735e9969819/ef2dfa173b9b5ca6-4f/s1280x1920/16822b4598c99673c8e55ad257dcb206dfb5c121.jpg";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState("");

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
              <FaUserAlt className='sidebar__icon' />
            </li>
            <li
              className='sidebar__item'
              onClick={() =>
                setSidebarOpen((curr) => {
                  if (curr === "settings") {
                    return "";
                  }
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
                    return "";
                  }
                  return "user";
                })
              }
            >
              <div className='sidebar__user'>
                <img className='sidebar__user-img' src={URL_TEMP} alt='' />
              </div>
            </li>
          </ul>
        </div>
      </div>

      {sidebarOpen === "settings" ? <SidebarSettings /> : null}
      {sidebarOpen === "user" ? <SidebarUser /> : null}
    </div>
  );
};

export default Sidebar;

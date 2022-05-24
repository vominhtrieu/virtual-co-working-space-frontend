import { FaDoorClosed, FaPlus } from "react-icons/fa";
import { Dropdown } from "antd";

import { Menu } from 'antd';
import MenuDivider from "antd/lib/menu/MenuDivider";

const UserPopup = () => {

  const menu = (
    <Menu className="navbar__dropdown-menu">
      <Menu.Item className="navbar__dropdown-item">
        <div className="navbar__dropdown-content-top">
          <div className="navbar__dropdown-item-title">
            <p>Vo Minh Trieu</p>
            <p>nlpthuy137@gmail.com</p>
          </div>
          <div className="navbar__dropdown-item-icon">
            <FaDoorClosed />
          </div>
        </div>
      </Menu.Item>
      <MenuDivider />
      <Menu.Item className="navbar__dropdown-item">
        <div className="navbar__dropdown-content-bottom">
          <div className="navbar__dropdown-item-icon">
            <FaDoorClosed />
          </div>
          <p>Chỉnh sửa nhân vật</p>
        </div>

      </Menu.Item>
      <Menu.Item className="navbar__dropdown-item">
        <div className="navbar__dropdown-content-bottom">
          <div className="navbar__dropdown-item-icon">
            <FaDoorClosed />
          </div>
          <p>Đăng xuất</p>
        </div>

      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottomRight">
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
    </Dropdown>
  );
};

export default UserPopup;

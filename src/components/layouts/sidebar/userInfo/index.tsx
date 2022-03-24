import { RiLogoutBoxRFill } from "react-icons/ri";
import SidebarBox from "../sidebarBox";

const SidebarUser = () => {
  return (
    <SidebarBox>
      <div className='sidebar-user'>
        <div className='sidebar-user__title'>Information</div>
        <div className='sidebar-user__container'>
          {/* user info - start */}
          <div className='sidebar-user__info'>
            <ul className='sidebar-user__items'>
              {/* user item - start */}
              <li className='sidebar-user__item'>
                <div className='sidebar-user__item-title'>Họ và tên:</div>
                <div className='sidebar-user__item-content'>Võ Minh Triều</div>
              </li>
              {/* user item - end */}
              {/* user item - start */}
              <li className='sidebar-user__item'>
                <div className='sidebar-user__item-title'>Tuổi:</div>
                <div className='sidebar-user__item-content'>22</div>
              </li>
              {/* user item - end */}
              {/* user item - start */}
              <li className='sidebar-user__item'>
                <div className='sidebar-user__item-title'>Quê quán:</div>
                <div className='sidebar-user__item-content'>Long An</div>
              </li>
              {/* user item - end */}
              {/* user item - start */}
              <li className='sidebar-user__item'>
                <div className='sidebar-user__item-title'>Nơi ở:</div>
                <div className='sidebar-user__item-content'>TP Hồ Chí Minh</div>
              </li>
              {/* user item - end */}
            </ul>
          </div>
          {/* user info - end */}

          {/* logout -start */}
          <div className='sidebar-user__logout'>
            <div className='sidebar-user__logout-title'>Đăng xuất</div>
            <RiLogoutBoxRFill className='sidebar-user__logout-icon' />
          </div>
        </div>
      </div>
    </SidebarBox>
  );
};

export default SidebarUser;

import { RiLogoutBoxRFill } from "react-icons/ri";
import SidebarBox from "../sidebarBox";
import EditProfileForm from "./editProfileForm";

const SidebarUser = () => {
  return (
    <SidebarBox>
      <div className='sidebar-user'>
        <div className='sidebar-user__title'>Information</div>
        <div className='sidebar-user__container'>
          {/* user info - start */}
          <div className='sidebar-user__info'>
            <EditProfileForm />
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

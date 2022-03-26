import { useState } from "react";
import { RiLogoutBoxRFill } from "react-icons/ri";
import Button from "../../../UI/button";
import SidebarBox from "../sidebarBox";
import ChangePasswordForm from "./changePassForm";
import EditProfileForm from "./editProfileForm";
import {
  ChangePasswordFormValuesInterface,
  EditProfileFormValuesInterface,
} from "./types";

const SidebarUser = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPass, setIsChangingPass] = useState(false);

  const handleLogout = () => {};

  const handleChangeProfile = (values: EditProfileFormValuesInterface) => {
    console.log(values);
  };

  const handleChangePassword = (values: ChangePasswordFormValuesInterface) => {
    console.log(values);
  };

  return (
    <>
      {isChangingPass ? (
        <ChangePasswordForm
          onClose={() => {
            setIsChangingPass(false);
          }}
          onSubmit={handleChangePassword}
        />
      ) : null}
      <SidebarBox>
        <div className='sidebar-user'>
          <div className='sidebar-user__title'>Information</div>
          <div className='sidebar-user__container'>
            {/* user info - start */}
            <div className='sidebar-user__info'>
              {isEditing ? (
                <EditProfileForm
                  onClose={() => {
                    setIsEditing(false);
                  }}
                  onSubmit={handleChangeProfile}
                />
              ) : (
                <>
                  <ul className='sidebar-user__items'>
                    {/* user item - start */}
                    <li className='sidebar-user__item'>
                      <div className='sidebar-user__item-title'>Họ và tên:</div>
                      <div className='sidebar-user__item-content'>
                        Võ Minh Triều
                      </div>
                    </li>
                    {/* user item - end */}
                    {/* user item - start */}
                    <li className='sidebar-user__item'>
                      <div className='sidebar-user__item-title'>Email:</div>
                      <div className='sidebar-user__item-content'>22</div>
                    </li>
                    {/* user item - end */}
                    {/* user item - start */}
                    <li className='sidebar-user__item'>
                      <div className='sidebar-user__item-title'>
                        Số điện thoại:
                      </div>
                      <div className='sidebar-user__item-content'>Long An</div>
                    </li>
                    {/* user item - end */}
                    {/* user item - start */}
                    <li className='sidebar-user__item'>
                      <div className='sidebar-user__item-title'>
                        Ngày tham gia:
                      </div>
                      <div className='sidebar-user__item-content'>
                        TP Hồ Chí Minh
                      </div>
                    </li>
                    {/* user item - end */}
                  </ul>

                  <div className='sidebar-user__group-btn'>
                    <Button
                      variant='primary'
                      onClick={() => {
                        setIsEditing(true);
                      }}
                    >
                      Chỉnh sửa thông tin
                    </Button>

                    <Button
                      variant='primary'
                      onClick={() => {
                        setIsChangingPass(true);
                      }}
                    >
                      Đổi mật khẩu
                    </Button>
                  </div>
                </>
              )}
            </div>
            {/* user info - end */}

            {/* logout -start */}
            <div className='sidebar-user__logout' onClick={handleLogout}>
              <div className='sidebar-user__logout-title'>Đăng xuất</div>
              <RiLogoutBoxRFill className='sidebar-user__logout-icon' />
            </div>
          </div>
        </div>
      </SidebarBox>
    </>
  );
};

export default SidebarUser;

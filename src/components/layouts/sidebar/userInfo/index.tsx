
import { useSelector } from "react-redux";
import { useState, useEffect} from "react";
import { RiLogoutBoxRFill } from "react-icons/ri";
import Button from "../../../UI/button";
import SidebarBox from "../sidebarBox";
import ChangePasswordForm from "./changePassForm";
import EditProfileForm from "./editProfileForm";

import { toastError, toastSuccess } from "../../../../helpers/toast";
import { useAppDispatch } from "../../../../stores";
import { ProxyStatusEnum } from "../../../../types/http/proxy/ProxyStatus";
import { setUserInfo } from "../../../../stores/auth-slice";
import ProfileProxy from "../../../../services/proxy/users/get-profile";

const SidebarUser = () => {
  
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPass, setIsChangingPass] = useState(false);

  const { user } = useSelector((state: any) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("huhu");
    console.log(user);
    ProfileProxy()
      .then((res) => {
        if (res.status === ProxyStatusEnum.FAIL) {

          toastError(res.message ?? "Load data fail!");
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          toastSuccess("login success");
          dispatch(setUserInfo(res?.data.userInfo));
        }
      })
      .catch((err) => {
        toastError(err.message ?? "Load data fail!");
      })
      .finally(() => {});
  }, [user]);

  return (
    <>
      {isChangingPass ? (
        <ChangePasswordForm
          onClose={() => {
            setIsChangingPass(false);
          }}
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
                />
              ) : (
                <>
                  <ul className='sidebar-user__items'>
                    {/* user item - start */}
                    <li className='sidebar-user__item'>
                      <div className='sidebar-user__item-title'>Họ và tên:</div>
                      <div className='sidebar-user__item-content'>
                        {user.name}
                      </div>
                    </li>
                    {/* user item - end */}
                    {/* user item - start */}
                    <li className='sidebar-user__item'>
                      <div className='sidebar-user__item-title'>Email:</div>
                      <div className='sidebar-user__item-content'>{user.email}</div>
                    </li>
                    {/* user item - end */}
                    {/* user item - start */}
                    <li className='sidebar-user__item'>
                      <div className='sidebar-user__item-title'>
                        Số điện thoại:
                      </div>
                      <div className='sidebar-user__item-content'>{user.phone}</div>
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
                </>
              )}
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
    </>
  );
};

export default SidebarUser;

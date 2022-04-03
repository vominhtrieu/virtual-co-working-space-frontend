import { useEffect, useState } from "react";
import { toastError, toastSuccess } from "../../../../helpers/toast";
import ProfileProxy from "../../../../services/proxy/users/get-profile";
import UpdateProfileProxy from "../../../../services/proxy/users/update-user";
import { useAppDispatch, useAppSelector } from "../../../../stores";
import { setUserInfo, userSelectors } from "../../../../stores/auth-slice";
import { ProxyStatusEnum } from "../../../../types/http/proxy/ProxyStatus";
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
  const userInfo = useAppSelector(userSelectors.getUserInfo);

  const dispatch = useAppDispatch();

  const handleChangeProfile = (values: EditProfileFormValuesInterface) => {
    UpdateProfileProxy({
      name: values.name,
      phone: values.phone,
      avatar: values.avatar,
    })
      .then((res) => {
        if (res.status === ProxyStatusEnum.FAIL) {
          console.log(res.message);
          toastError(res.message ?? "update fail");
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          console.log(res.data);
          toastSuccess("update success");
          setIsEditing(!isEditing);
        }
      })
      .catch((err) => {
        console.log(err);
        // show toast login fail
      })
      .finally(() => {});
  };

  const handleChangePassword = (values: ChangePasswordFormValuesInterface) => {
    console.log(values);
  };

  useEffect(() => {
    ProfileProxy()
      .then((res) => {
        if (res.status === ProxyStatusEnum.FAIL) {
          toastError(res.message ?? "Load data fail!");
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          dispatch(setUserInfo(res?.data.userInfo));
        }
      })
      .catch((err) => {
        toastError(err.message ?? "Load data fail!");
      })
      .finally(() => {});
  }, [dispatch]);

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
                        {userInfo.name}
                      </div>
                    </li>
                    {/* user item - end */}
                    {/* user item - start */}
                    <li className='sidebar-user__item'>
                      <div className='sidebar-user__item-title'>Email:</div>
                      <div className='sidebar-user__item-content'>
                        {userInfo.email}
                      </div>
                    </li>
                    {/* user item - end */}
                    {/* user item - start */}
                    <li className='sidebar-user__item'>
                      <div className='sidebar-user__item-title'>
                        Số điện thoại:
                      </div>
                      <div className='sidebar-user__item-content'>
                        {userInfo.phone}
                      </div>
                    </li>
                    {/* user item - end */}
                    {/* user item - start */}
                    <li className='sidebar-user__item'>
                      <div className='sidebar-user__item-title'>
                        Ngày tham gia:
                      </div>
                      <div className='sidebar-user__item-content'>
                        {userInfo.createdAt}
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
          </div>
        </div>
      </SidebarBox>
    </>
  );
};

export default SidebarUser;

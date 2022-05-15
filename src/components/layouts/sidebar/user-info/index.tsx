import { useEffect, useState } from "react";
import { toastError, toastSuccess } from "../../../../helpers/toast";
import ProfileProxy from "../../../../services/proxy/users/get-profile";
import UpdateProfileProxy from "../../../../services/proxy/users/update-user";
import { useAppDispatch, useAppSelector } from "../../../../stores";
import { setUserInfo, userSelectors } from "../../../../stores/auth-slice";
import { ProxyStatusEnum } from "../../../../types/http/proxy/ProxyStatus";
import Button from "../../../UI/button";
import SidebarBox from "../sidebar-box";
import ChangePasswordForm from "./change-pass-form";
import EditProfileForm from "./edit-profile-form";
import {
  ChangePasswordFormValuesInterface,
  EditProfileFormValuesInterface,
} from "./types";
import { loadSelectors } from "../../../../stores/load-slice";
import { Skeleton } from "antd";

const SidebarUser = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPass, setIsChangingPass] = useState(false);
  const userInfo = useAppSelector(userSelectors.getUserInfo);
  const isLoading = useAppSelector(loadSelectors.getIsLoad);
  const arrThumnail: number[] = new Array(0, 1, 2, 3);

  const dispatch = useAppDispatch();

  const handleChangeProfile = (values: EditProfileFormValuesInterface) => {
    if (values.avatar === "") {
      toastError("Avatar is require");
    }
    else {
      UpdateProfileProxy({
        name: values.name,
        phone: values.phone,
        avatar: values.avatar,
      })
        .then((res) => {
          if (res.status === ProxyStatusEnum.FAIL) {
            toastError(res.message ?? "update fail");
          }

          if (res.status === ProxyStatusEnum.SUCCESS) {
            dispatch(setUserInfo(res?.data.userInfo));
            toastSuccess("update success");
            setIsEditing(!isEditing);
          }
        })
        .catch((err) => {
          toastError(err.message ?? "update fail");
        })
        .finally(() => { });
    }
  };

  const handleChangePassword = (values: ChangePasswordFormValuesInterface) => {
    console.log(values);
  };

  useEffect(() => {
    ProfileProxy()
      .then((res) => {
        console.log(res);
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
      .finally(() => { });
  }, [dispatch]);

  const padTo2Digits = (num: number) => {
    return num.toString().padStart(2, '0');
  }

  const parseStringToDate = (dateSTr) => {
    if (dateSTr) {
      const date = new Date(dateSTr);
      return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
      ].join("/");
    }
    return "";
  }

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
                  {isLoading ?
                    <>{arrThumnail?.map(() => (
                      <li className='sidebar-user__item'>
                        {/* <div className='sidebar-user__item-title'>Email:</div>
                      <div className='sidebar-user__item-content'>
                        {userInfo.email}
                      </div> */}
                        <Skeleton.Button className="sidebar-user__item-title" />
                        <Skeleton.Button className="sidebar-user__item-content" />
                      </li>
                    ))
                    }
                      <div className='sidebar-user__group-btn'>
                      <Skeleton.Button />
                      <Skeleton.Button />
                      </div>
                    </> : <>
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
                            {parseStringToDate(userInfo.createdAt)}
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
                  }

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

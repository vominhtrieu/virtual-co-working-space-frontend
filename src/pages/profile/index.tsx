import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layouts/navbar";
import { toastError, toastSuccess } from "../../helpers/toast";
import ProfileProxy from "../../services/proxy/users/get-profile";
import UpdateProfileProxy from "../../services/proxy/users/update-user";
import ChangePasswordProxy from "../../services/proxy/users/change-password";
import { useAppDispatch, useAppSelector } from "../../stores";
import { setUserInfo, userSelectors } from "../../stores/auth-slice";
import { ProxyStatusEnum } from "../../types/http/proxy/ProxyStatus";
import NewButton from "../../components/UI/new-button";
import Button from "../../components/UI/button";
import { FaPlus } from "react-icons/fa";
import { UserOutlined } from "@ant-design/icons";
import ChangePasswordForm from "./change-pass-form";
import EditProfileForm from "./edit-profile-form";
import { ChangePasswordFormValuesInterface, EditProfileFormValuesInterface } from "./types";


const Profile = () => {
    const dispatch = useAppDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [isChangingPass, setIsChangingPass] = useState(false);
    const userInfo = useAppSelector(userSelectors.getUserInfo);
    // const isLoading = useAppSelector(loadSelectors.getIsLoad);

    const navigate = useNavigate();

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
        ChangePasswordProxy(values)
            .then((res) => {
                if (res.status === ProxyStatusEnum.FAIL) {
                    toastError(res.message ?? "Change password fail!");
                }

                if (res.status === ProxyStatusEnum.SUCCESS) {
                    setIsChangingPass(false);
                    toastSuccess("Password changed successfully.");
                }
            })
            .catch((err) => {
                toastError(err.message ?? "Change password fail!");
            })
            .finally(() => { });
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
            .finally(() => { });
    }, [dispatch]);

    return (
        <section className="lobby">
            {isChangingPass ? (
                <ChangePasswordForm
                    onClose={() => {
                        setIsChangingPass(false);
                    }}
                    onSubmit={handleChangePassword}
                />
            ) : null}

            {isEditing ? (
                <EditProfileForm
                    onClose={() => {
                        setIsEditing(false);
                    }}
                    onSubmit={handleChangeProfile}
                />
            ) : null}

            {/* <Navbar /> */}
            <div className="lobby__profile">
                <div className="lobby__profile-container">
                    <div className="lobby__profile-title">
                        Your Account
                    </div>
                    <div className="lobby__profile-content">
                        {userInfo.avatar == "" ?
                            <div className="lobby__profile-avatar">
                                <UserOutlined />
                            </div> : <img
                                src={userInfo.avatar}
                                alt=""
                                className="lobby__profile-avatar"
                            />
                        }
                        <ul className='lobby__profile-user-items'>
                            {/* user item - start */}
                            <li className='lobby__profile-user-item'>
                                <div className='lobby__profile-user-item-title'>Name</div>
                                <div className='lobby__profile-user-item-content'>
                                    {userInfo.name}
                                </div>
                            </li>
                            {/* user item - end */}
                            {/* user item - start */}
                            <li className='lobby__profile-user-item'>
                                <div className='lobby__profile-user-item-title'>Email</div>
                                <div className='lobby__profile-user-item-content'>
                                    {userInfo.email}
                                </div>
                            </li>
                            {/* user item - end */}
                            {/* user item - start */}
                            <li className='lobby__profile-user-item'>
                                <div className='lobby__profile-user-item-title'>
                                    Phone number
                                </div>
                                <div className='lobby__profile-user-item-content'>
                                    {userInfo.phone}

                                </div>
                            </li>
                            {/* user item - end */}
                            {/* user item - start */}
                            <li className='lobby__profile-user-item'>
                                <div className='lobby__profile-user-item-title'>
                                    Joined date
                                </div>
                                <div className='lobby__profile-user-item-content'>
                                    {parseStringToDate(userInfo.createdAt)}
                                </div>
                            </li>
                            {/* user item - end */}
                        </ul>
                        <div className='lobby__profile-user-group-btn'>
                            <Button type='submit' variant="primary" onClick={() => {
                                setIsEditing(true);
                            }}>
                                {/* {isLoading ? <Spin style={{ paddingRight: 5 }} /> : null} */}
                                Change Profile
                            </Button>
                            <Button type='submit' variant="primary" onClick={() => {
                                setIsChangingPass(true);
                            }}>
                                {/* {isLoading ? <Spin style={{ paddingRight: 5 }} /> : null} */}
                                Change Password
                            </Button>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;

import { UserOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/layouts/navbar'
import Button from '../../components/UI/button'
import { removeAll } from '../../helpers/cookies'
import { removeAllDataLocal } from '../../helpers/localStorage'
import { toastError, toastSuccess } from '../../helpers/toast'
import ChangePasswordProxy from '../../services/proxy/users/change-password'
import ProfileProxy from '../../services/proxy/users/get-profile'
import UpdateProfileProxy from '../../services/proxy/users/update-user'
import { useAppDispatch, useAppSelector } from '../../stores'
import { Avatar } from 'antd'
import {
  setAuthenticated,
  setUserInfo,
  userSelectors,
} from '../../stores/auth-slice'
// import { setUserInfo, userSelectors } from "../../stores/auth-slice";
import { ProxyStatusEnum } from '../../types/http/proxy/ProxyStatus'
import ChangePasswordForm from './change-pass-form'
import EditProfileForm from './edit-profile-form'
import {
  ChangePasswordFormValuesInterface,
  EditProfileFormValuesInterface,
} from './types'
import { useTranslation } from "react-i18next";


const Profile = () => {
  const dispatch = useAppDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [isChangingPass, setIsChangingPass] = useState(false)
  const userInfo = useAppSelector(userSelectors.getUserInfo)
  // const isLoading = useAppSelector(loadSelectors.getIsLoad);
  const { t } = useTranslation();

  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(setAuthenticated(false))
    dispatch(setUserInfo({}))
    removeAllDataLocal()
    removeAll()
    navigate('/auth/login')
  }

  const padTo2Digits = (num: number) => {
    return num.toString().padStart(2, '0')
  }

  const parseStringToDate = (dateSTr) => {
    if (dateSTr) {
      const date = new Date(dateSTr)
      return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
      ].join('/')
    }
    return ''
  }

  const handleChangeProfile = (values: EditProfileFormValuesInterface) => {
    if (values.avatar === '') {
      toastError('Avatar is require')
    } else {
      UpdateProfileProxy({
        name: values.name,
        phone: values.phone,
        avatar: values.avatar,
      })
        .then((res) => {
          if (res.status === ProxyStatusEnum.FAIL) {
            toastError(t(`error.${res.message}`) ?? 'update fail')
          }

          if (res.status === ProxyStatusEnum.SUCCESS) {
            dispatch(setUserInfo(res?.data.userInfo))
            toastSuccess('update success')
            setIsEditing(!isEditing)
          }
        })
        .catch((err) => {
          toastError(t(`error.${err.message}`) ?? 'update fail')
        })
        .finally(() => { })
    }
  }

  const handleChangePassword = (values: ChangePasswordFormValuesInterface) => {
    ChangePasswordProxy(values)
      .then((res) => {
        if (res.status === ProxyStatusEnum.FAIL) {
          toastError(t(`error.${res.message}`) ?? 'Change password fail!')
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          setIsChangingPass(false)
          toastSuccess('Password changed successfully.')
          handleLogout()
          navigate('/auth/login')
        }
      })
      .catch((err) => {
        toastError(t(`error.${err.message}`) ?? 'Change password fail!')
      })
      .finally(() => { })
  }

  useEffect(() => {
    ProfileProxy()
      .then((res) => {
        if (res.status === ProxyStatusEnum.FAIL) {
          toastError(t(`error.${res.message}`) ?? 'Load data fail!')
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          dispatch(setUserInfo(res?.data.userInfo))
        }
      })
      .catch((err) => {
        toastError(t(`error.${err.message}`) ?? 'Load data fail!')
      })
      .finally(() => { })
  }, [dispatch])

  return (
    <section className="lobby">
      {isChangingPass ? (
        <ChangePasswordForm
          onClose={() => {
            setIsChangingPass(false)
          }}
          onSubmit={handleChangePassword}
        />
      ) : null}

      {isEditing ? (
        <EditProfileForm
          onClose={() => {
            setIsEditing(false)
          }}
          onSubmit={handleChangeProfile}
        />
      ) : null}

      <Navbar />
      <div className="lobby__profile">
        <div className="lobby__profile-container">
          <div className="lobby__profile-content">
            <div className="lobby__profile-avatar">
              {userInfo.avatar === '' ? (
                <Avatar shape="circle" size={250} icon={<UserOutlined />} />
              ) : (
                <Avatar shape="circle" size={250} src={userInfo.avatar} />

              )}
            </div>

            <ul className="lobby__profile-user-items">
              {/* user item - start */}
              <li className="lobby__profile-user-item">
                <div className="lobby__profile-user-item-title">{t("pages.profile.name")}</div>
                <div className="lobby__profile-user-item-content">
                  {userInfo.name}
                </div>
              </li>
              {/* user item - end */}
              {/* user item - start */}
              <li className="lobby__profile-user-item">
                <div className="lobby__profile-user-item-title">{t("pages.profile.email")}</div>
                <div className="lobby__profile-user-item-content">
                  {userInfo.email}
                </div>
              </li>
              {/* user item - end */}
              {/* user item - start */}
              <li className="lobby__profile-user-item">
                <div className="lobby__profile-user-item-title">
                  {t("pages.profile.phone")}                </div>
                <div className="lobby__profile-user-item-content">
                  {userInfo.phone}
                </div>
              </li>
              {/* user item - end */}
              {/* user item - start */}
              <li className="lobby__profile-user-item">
                <div className="lobby__profile-user-item-title">
                  {t("pages.profile.date")}                </div>
                <div className="lobby__profile-user-item-content">
                  {parseStringToDate(userInfo.createdAt)}
                </div>
              </li>
              {/* user item - end */}
            </ul>
            <div className="lobby__profile-user-group-btn">
              <Button
                type="submit"
                className="ok"
                onClick={() => {
                  setIsEditing(true)
                }}
              >
                {/* {isLoading ? <Spin style={{ paddingRight: 5 }} /> : null} */}
                {t("pages.profile.changeProfile")}
              </Button>
              <Button
                type="submit"
                className="ok"
                onClick={() => {
                  setIsChangingPass(true)
                }}
              >
                {/* {isLoading ? <Spin style={{ paddingRight: 5 }} /> : null} */}
                {t("pages.profile.changePassword")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profile

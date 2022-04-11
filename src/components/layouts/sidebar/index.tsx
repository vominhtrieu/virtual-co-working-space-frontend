
import { useState } from 'react'
import { BsFillChatFill } from 'react-icons/bs'
import { FaUserAlt } from 'react-icons/fa'
import { MdMeetingRoom } from 'react-icons/md'
import {
  RiLogoutBoxRFill,
  RiSettings4Fill,
  RiUserSettingsFill,
} from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { removeAllDataLocal } from '../../../helpers/localStorage'
import { toastError, toastSuccess } from '../../../helpers/toast'
import LogoutProxy from '../../../services/proxy/auth/logout'
import { useAppDispatch, useAppSelector } from '../../../stores'
import { setAuthenticated, setUserInfo } from '../../../stores/auth-slice'
import { setOpen, sidebarSelectors } from '../../../stores/sidebar-slice'
import { ProxyStatusEnum } from '../../../types/http/proxy/ProxyStatus'
import { userSelectors } from '../../../stores/auth-slice'
import SidebarChat from './chat'
import Offices from './offices'
import SidebarSettings from './settings'
import SidebarUser from './userInfo'
import { Avatar } from 'antd'
import { UserOutlined } from "@ant-design/icons";


const Sidebar = () => {
  const dispatch = useAppDispatch()
  const [sidebarOpen, setSidebarOpen] = useState('')
  const currSidebar = useAppSelector(sidebarSelectors.getOpen)
  const navigate = useNavigate()
  const userInfo = useAppSelector(userSelectors.getUserInfo);

  const handleLogout = () => {
    LogoutProxy()
      .then((res) => {
        if (res.status === ProxyStatusEnum.FAIL) {
          toastError(res.message ?? 'Logout fail')
          return
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          toastSuccess('Logout success')
          dispatch(setAuthenticated(false))
          dispatch(setUserInfo({}))
          removeAllDataLocal()
          navigate('/auth/login')
          return
        }
      })
      .catch((err) => {
        toastError(err.message ?? 'Logout fail')
      })
  }

  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <div className="sidebar__logo">VW</div>

        <div className="sidebar__menu">
          <ul className="sidebar__items">
            <li
              className={
                'sidebar__item' + (currSidebar === 'character' ? ' active' : '')
              }
              onClick={() => {
                navigate('/character')
                setSidebarOpen('character')
                dispatch(setOpen('character'))
              }}
            >
              <RiUserSettingsFill className="sidebar__icon" />
            </li>
            <li
              className={
                'sidebar__item' + (currSidebar === 'chat' ? ' active' : '')
              }
              onClick={() =>
                setSidebarOpen((curr) => {
                  if (curr === 'chat') {
                    dispatch(setOpen(''))
                    return ''
                  }
                  dispatch(setOpen('chat'))
                  return 'chat'
                })
              }
            >
              <BsFillChatFill className="sidebar__icon" />
            </li>
            <li
              className={
                'sidebar__item' + (currSidebar === 'office' ? ' active' : '')
              }
              onClick={() =>
                setSidebarOpen((curr) => {
                  if (curr === 'office') {
                    dispatch(setOpen(''))
                    return ''
                  }
                  dispatch(setOpen('office'))
                  return 'office'
                })
              }
            >
              <MdMeetingRoom className="sidebar__icon" />
            </li>
          </ul>
        </div>

        <div className="sidebar__menu">
          <ul className="sidebar__items">
            <li
              className={
                'sidebar__item' + (currSidebar === 'settings' ? ' active' : '')
              }
              onClick={() =>
                setSidebarOpen((curr) => {
                  if (curr === 'settings') {
                    dispatch(setOpen(''))
                    return ''
                  }
                  dispatch(setOpen('settings'))
                  return 'settings'
                })
              }
            >
              <RiSettings4Fill className="sidebar__icon" />
            </li>

            <li
              className={
                'sidebar__item' + (currSidebar === 'user' ? ' active' : '')
              }
              onClick={() =>
                setSidebarOpen((curr) => {
                  if (curr === 'user') {
                    dispatch(setOpen(''))
                    return ''
                  }
                  dispatch(setOpen('user'))
                  return 'user'
                })
              }
            >
              {userInfo.avatar !== "" ? (
                <Avatar size={40} src={userInfo.avatar} />
              ) : (
                <Avatar size={40} icon={<UserOutlined />} />
              )}            
            </li>

            <li className={'sidebar__item'} onClick={handleLogout}>
              <RiLogoutBoxRFill className="sidebar__icon" />
            </li>
          </ul>
        </div>
      </div>

      {sidebarOpen === 'settings' ? <SidebarSettings /> : null}
      {sidebarOpen === 'user' ? <SidebarUser /> : null}
      {sidebarOpen === 'office' ? <Offices /> : null}
      {sidebarOpen === 'chat' ? <SidebarChat /> : null}
    </div>
  )
}

export default Sidebar

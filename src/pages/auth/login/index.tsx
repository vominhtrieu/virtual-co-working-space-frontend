// import React, { useState } from "react";
import { Col, Row } from 'antd'
import { useNavigate } from 'react-router-dom'
import loginImage from '../../../assets/images/login/login-image.png'
import LoginForm from '../../../components/login/loginForm'
import { saveDataLocal } from '../../../helpers/localStorage'
import { toastError, toastSuccess } from '../../../helpers/toast'
import LoginProxy from '../../../services/proxy/auth/login'
import LoginFacebookProxy from '../../../services/proxy/auth/loginFacebook'
import LoginGoogleProxy from '../../../services/proxy/auth/loginGoogle'
import { useAppDispatch } from '../../../stores'
import { setAuthenticated, setUserInfo } from '../../../stores/auth-slice'
import { ProxyStatusEnum } from '../../../types/http/proxy/ProxyStatus'
import { LoginFormValues } from './type'

function Login() {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const handleGoogleLogin = () => {
    navigate(`${process.env.REACT_APP_BASE_URL}/auth/google`)
  }
  const handleFacebookLogin = () => {
    LoginFacebookProxy()
      .then((res) => {
        if (res.status === ProxyStatusEnum.FAIL) {
          console.log(res)
          console.log(res.message)
          toastError(res.message ?? 'Login fail')
          return
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          toastSuccess('login success')
          dispatch(setAuthenticated(true))
          dispatch(setUserInfo(res?.data.userInfo))
          saveDataLocal('user_id', res.data.userInfo.id)
          saveDataLocal('user_info', JSON.stringify(res.data.userInfo))
          saveDataLocal('access_token', res.data.accessToken)
          saveDataLocal('refresh_token', res.data.refreshToken)
          navigate('/')
          return
        }
      })
      .catch((err) => {
        toastError(err.message ?? 'Login fail')
      })
      .finally(() => {})
  }

  const handleLogin = (values: LoginFormValues) => {
    LoginProxy({
      email: values.email,
      password: values.password,
    })
      .then((res) => {
        if (res.status === ProxyStatusEnum.FAIL) {
          console.log(res)
          console.log(res.message)
          toastError(res.message ?? 'Login fail')
          return
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          toastSuccess('login success')
          dispatch(setAuthenticated(true))
          dispatch(setUserInfo(res?.data.userInfo))
          saveDataLocal('user_id', res.data.userInfo.id)
          saveDataLocal('user_info', JSON.stringify(res.data.userInfo))
          saveDataLocal('access_token', res.data.accessToken)
          saveDataLocal('refresh_token', res.data.refreshToken)
          navigate('/')
          return
        }
      })
      .catch((err) => {
        toastError(err.message ?? 'Login fail')
      })
      .finally(() => {})
  }

  return (
    <section className="login">
      <Row justify="space-around">
        <Col span={6}>
          <div className="login__form">
            <LoginForm
              handleLoginSubmit={handleLogin}
              handleLoginGoogleSubmit={handleGoogleLogin}
              handleLoginFacebookSubmit={handleFacebookLogin}
            />
          </div>
        </Col>
        <Col span={10}>
          <div className="login__img">
            <img src={loginImage} alt="ViWorkSpaceloginImage" />
          </div>
        </Col>
      </Row>
    </section>
  )
}

export default Login

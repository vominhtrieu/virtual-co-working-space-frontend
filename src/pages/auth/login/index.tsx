// import React, { useState } from "react";
import { Col, Row } from 'antd'
import { useNavigate } from 'react-router-dom'
import loginImage from '../../../assets/images/login/login-image.png'
import LoginForm from '../../../components/login/loginForm'
import { saveDataLocal } from '../../../helpers/localStorage'
import { toastError, toastSuccess } from '../../../helpers/toast'
import LoginProxy from '../../../services/proxy/auth/login'
import { useAppDispatch } from '../../../stores'
import { setAuthenticated, setUserInfo } from '../../../stores/auth-slice'
import { ProxyStatusEnum } from '../../../types/http/proxy/ProxyStatus'
import { LoginFormValues } from './type'

function Login() {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const handleLogin = (values: LoginFormValues) => {
    LoginProxy({
      email: values.email,
      password: values.password,
    })
      .then((res) => {
        if (res.status === ProxyStatusEnum.FAIL) {
          toastError(res.message ?? 'Login fail')
          return
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          console.log("success");
          toastSuccess('login success')
          saveDataLocal('user_id', res.data.userInfo.id)
          saveDataLocal('user_info', JSON.stringify(res.data.userInfo))
          saveDataLocal('access_token', res.data.accessToken)
          saveDataLocal('refresh_token', res.data.refreshToken)
          dispatch(setUserInfo(res?.data.userInfo))
          dispatch(setAuthenticated(true))
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

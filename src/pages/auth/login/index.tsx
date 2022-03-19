// import React, { useState } from "react";
import { Col, Row } from "antd";
import loginImage from "../../../assets/images/login/login-image.png";
import LoginForm from "../../../components/login/loginForm";
import LoginProxy from "../../../services/proxy/auth/login";
import { setAuthenticated, setUserInfo } from "../../../stores/auth-slice";
import { ProxyStatusEnum } from "../../../types/http/proxy/ProxyStatus";
import { LoginFormValues } from "./type";

function Login() {
  const handleLogin = (values: LoginFormValues) => {
    LoginProxy({
      email: values.email,
      password: values.password,
    })
      .then((res) => {
        console.log(res);
        if (res.status === ProxyStatusEnum.FAIL) {
          console.log("login fail");
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          setAuthenticated(true);
          setUserInfo(res?.data.userInfo);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };

  return (
    <section className='login'>
      <Row justify='space-around'>
        <Col span={6}>
          <div className='login__form'>
            <LoginForm handleLoginSubmit={handleLogin} />
          </div>
        </Col>
        <Col span={10}>
          <div className='login__img'>
            <img src={loginImage} alt='ViWorkSpaceloginImage' />
          </div>
        </Col>
      </Row>
    </section>
  );
}

export default Login;

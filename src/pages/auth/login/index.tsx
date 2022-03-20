// import React, { useState } from "react";
import { Col, Row } from "antd";
import loginImage from "../../../assets/images/login/login-image.png";
import LoginForm from "../../../components/login/loginForm";
import { saveDataLocal } from "../../../helpers/localStorage";
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
          // show toast login fail
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          setAuthenticated(true);
          setUserInfo(res?.data.userInfo);
          saveDataLocal("user_id", res.data.userInfo.id);
        }
      })
      .catch((err) => {
        console.log(err);
        // show toast login fail
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

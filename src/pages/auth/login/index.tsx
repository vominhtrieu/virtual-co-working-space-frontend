// import React, { useState } from "react";
import LoginForm from "../../../components/UI/form/loginForm";
import { Col, Row } from "antd";
import loginImage from "../../../assets/images/login/login-image.png";

function Login() {
  const handleLogin = (values) => {
    console.log("values login", values);
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

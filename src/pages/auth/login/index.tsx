// import React, { useState } from "react";
import LoginForm from "../../../components/UI/form/loginForm";
import { Col, Row } from "antd";

function Login() {
  const handleLogin = (values) => {
    console.log("values login", values);
  };

  return (
    <section className='login'>
      <div style={{ clear: "right" }}></div>

      <Row justify='space-around' >
        <Col span={6}>
          <LoginForm handleLoginSubmit={handleLogin} />
        </Col>
        <Col span={10}>
          <img width='80%' src='./images/login.svg' alt='' />
        </Col>
      </Row>
    </section>
  );
}

export default Login;

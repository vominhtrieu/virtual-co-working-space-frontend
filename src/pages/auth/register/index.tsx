// import React, { useState } from "react";
import { Col, Row } from "antd";
import registerImage from "../../../assets/images/register/register-img.svg";
import IconLanguages from "../../../components/icon-lang";
import { RegisterFormValuesInterface } from "./type";
import RegisterForm from "../../../components/register/registerForm";

function Register() {
  const handleRegister = (values: RegisterFormValuesInterface) => {
    // RegisterProxy(values);
  };

  return (
    <section className='register'>
       <IconLanguages />
      <Row justify='space-around'>
        <Col span={6}>
          <div className='register__form'>
            <RegisterForm handleRegisterSubmit={handleRegister} />
          </div>
        </Col>
        <Col span={10}>
          <div className='register__img'>
            <img src={registerImage} alt='ViWorkSpaceloginImage' />
          </div>
        </Col>
      </Row>
    </section>
  );
}

export default Register;

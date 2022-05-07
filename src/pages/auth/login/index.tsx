// import React, { useState } from "react";
import { Col, Row, Spin } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "../../../assets/images/login/login.gif";
import LoginForm from "../../../components/login/loginForm";
import { saveData } from "../../../helpers/cookies";
import { saveDataLocal } from "../../../helpers/localStorage";
import { toastError, toastSuccess } from "../../../helpers/toast";
import LoginProxy from "../../../services/proxy/auth/login";
import { useAppDispatch } from "../../../stores";
import { setAuthenticated, setUserInfo } from "../../../stores/auth-slice";
import { ProxyStatusEnum } from "../../../types/http/proxy/ProxyStatus";
import { LoginFormValues } from "./type";

function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleLogin = (values: LoginFormValues) => {
    LoginProxy({
      email: values.email,
      password: values.password,
    })
      .then((res) => {
        console.log(res);
        if (res.status === ProxyStatusEnum.FAIL) {
          setIsLoading(false);
          toastError(res.message ?? "Login fail");
          return;
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          console.log("success");
          toastSuccess("login success");
          saveDataLocal("user_id", res.data.userInfo.id);
          saveDataLocal("user_info", JSON.stringify(res.data.userInfo));
          saveDataLocal("access_token", res.data.accessToken);
          saveData("refresh_token", res.data.refreshToken);
          dispatch(setUserInfo(res?.data.userInfo));
          dispatch(setAuthenticated(true));
          navigate("/");
          setIsLoading(false);
          return;
        }
      })
      .catch((err) => {
        toastError(err.message ?? "Login fail");
        setIsLoading(false);
      })
      .finally(() => {});
  };

  const FormLogin = () => {
    return (
      <Row justify="space-around">
        <Col span={6}>
          <div className="login__form">
            <LoginForm handleLoginSubmit={handleLogin} />
          </div>
        </Col>
        <Col span={10}>
          <div className="login__img">
            <img src={loginImage} alt="ViWorkSpaceloginImage" />
          </div>
        </Col>
      </Row>
    );
  };

  return (
    <section className="login">
      {isLoading ? (
        <Spin>
          <FormLogin />
        </Spin>
      ) : (
        <FormLogin />
      )}
    </section>
  );
}

export default Login;

// import React, { useState } from "react";
import { Col, Row, Spin } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import loginImage from "../../../assets/images/login/login.gif";
import IconLanguages from "../../../components/icon-lang";
import LoginForm from "../../../components/login/login-form";
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
  const { t } = useTranslation();

  const handleLogin = (values: LoginFormValues) => {
    setIsLoading(true);
    LoginProxy({
      email: values.email,
      password: values.password,
    })
      .then((res) => {
        if (res.status === ProxyStatusEnum.FAIL) {
          setIsLoading(false);
          toastError(
            t(`error.${res.message}`) ?? t("default.noti.loginFailed")
          );
          return;
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          toastSuccess(t("default.noti.loginSuccess"));
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
        toastError(t(`error.${err.message}`) ?? t("default.noti.loginFailed"));
        setIsLoading(false);
      })
      .finally(() => {});
  };

  const FormLogin = () => {
    return (
      <>
        <div className="icon-lang">
          <IconLanguages />
        </div>
        <Row justify="space-around">
          <Col span={12}>
            <div className="login__img">
              <img src={loginImage} alt="ViSpace Login Image" />
            </div>
          </Col>
          <Col span={6}>
            <div className="login__form">
              <LoginForm handleLoginSubmit={handleLogin} loading={isLoading} />
            </div>
          </Col>
        </Row>
      </>
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

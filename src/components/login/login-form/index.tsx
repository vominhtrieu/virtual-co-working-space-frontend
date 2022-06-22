import { yupResolver } from "@hookform/resolvers/yup";
import { Spin } from "antd";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FaEnvelope, FaKey } from "react-icons/fa";
import { RiFacebookFill, RiGoogleFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useAppSelector } from "../../../stores";
import { loadSelectors } from "../../../stores/load-slice";
import InputText from "../../UI/form-controls/input-text";
import { FormPropsInterface, InputInterface } from "./types";

const LoginForm = (props: FormPropsInterface) => {
  const { handleLoginSubmit } = props;
  const isLoading = useAppSelector(loadSelectors.getIsLoad);
  console.log(isLoading)
  const { t } = useTranslation();

  const schema = yup.object().shape({
    email: yup
      .string()
      .required(t("default.error.required", { field: t("pages.login.email") }))
      .email(t("default.error.email", { field: t("pages.login.email") })),
    password: yup
      .string()
      .required(
        t("default.error.required", { field: t("pages.register.password") })
      )
      .min(
        8,
        t("default.error.minLength", {
          field: t("pages.register.password"),
          min: 8,
        })
      ),
  });

  const { control, handleSubmit } = useForm<InputInterface>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onLoginSubmit = (values: InputInterface) => {
    const formValues = {
      email: values["email"],
      password: values["password"],
    };

    handleLoginSubmit(formValues);
  };

  return (
    <form
      className="login-form"
      autoComplete="off"
      onSubmit={handleSubmit(onLoginSubmit)}
    >
      {/*<div className="login-form__title">*/}
      {/*  <h1 className="login-form__title-cell">{t('pages.login.title')}</h1>*/}
      {/*</div>*/}
      <div className="login-form__input-block">
        <InputText
          name="email"
          control={control}
          prefix={<FaEnvelope />}
          label={t("pages.login.email")}
          size="large"
          placeholder={t("pages.login.email")}
          autoComplete="off"
        />
      </div>

      <div className="login-form__input-block">
        <InputText
          type="password"
          name="password"
          control={control}
          prefix={<FaKey />}
          size="large"
          label={t("pages.login.password")}
          placeholder={t("pages.login.password")}
          autoComplete="off"
        />
      </div>

      <div className="login-form__forgot-pass">
        <Link to="/auth/forgot">{t("pages.login.forgotPass")}</Link>
      </div>

      <button type="submit" className="login-form__btn" disabled={isLoading}>
        {isLoading ? <Spin style={{ paddingRight: 5 }} /> : null}
        {t("pages.login.title")}
      </button>

      <div className="login-form__not-member">
        {t("pages.login.notMember")}
        <Link to="/auth/register">
          <span>{t("pages.login.registerNow")}</span>
        </Link>
      </div>

      <div className="login-form__or">{t("pages.login.or")}</div>

      <div className="login-form__social">
        <a href={`${process.env.REACT_APP_BASE_URL}/auth/google`}>
          <div className="login-form__social-btn login-form__google-btn">
            <div className="login-form__social-item">
              <RiGoogleFill />
            </div>
            <div>{t("pages.login.google")}</div>
          </div>
        </a>
        <a href={`${process.env.REACT_APP_BASE_URL}/auth/facebook`}>
          <div className="login-form__social-btn login-form__facebook-btn">
            <div className="login-form__social-item">
              <RiFacebookFill />
            </div>
            <div>{t("pages.login.facebook")}</div>
          </div>
        </a>
      </div>
    </form>
  );
};

export default LoginForm;

import { useForm } from "react-hook-form";
import {
  RiFacebookFill,
  RiGithubFill,
  RiGoogleFill,
  RiLinkedinFill,
  RiTwitterLine,
} from "react-icons/ri";
import { FaEnvelope, FaKey } from "react-icons/fa";
import { FormPropsInterface, InputInterface } from "./types";
import InputText from "../../UI/form-controls/inputText";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

const LoginForm = (props: FormPropsInterface) => {
  const {
    handleLoginSubmit,
    handleLoginGoogleSubmit,
    handleLoginFacebookSubmit,
  } = props;
  const { t } = useTranslation();

  const schema = yup.object().shape({
    email: yup
      .string()
      .required(t("default.error.required", { field: t("pages.login.email") }))
      .email(t("default.error.email", { field: t("pages.login.email") })),
    password: yup
      .string()
      .required(
        t("default.error.required", { field: t("pages.login.password") })
      )
      .min(
        6,
        t("default.error.minLength", {
          field: t("pages.login.password"),
          min: 6,
        })
      ),
  });

  const { control, handleSubmit } = useForm<InputInterface>({
    defaultValues: {
      email: "",
      password: "",
    },
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
    <form className='login-form' onSubmit={handleSubmit(onLoginSubmit)}>
      <h1 className='login-form__title'>{t("pages.login.title")}</h1>
      <div className='login-form__input-block'>
        <InputText
          hasLabel
          name='email'
          control={control}
          prefix={<FaEnvelope />}
          size='large'
          placeholder={t("pages.login.email")}
        />
      </div>

      <div className='login-form__input-block'>
        <InputText
          hasLabel
          type='password'
          name='password'
          control={control}
          prefix={<FaKey />}
          size='large'
          placeholder={t("pages.login.password")}
        />
      </div>

      <div className='login-form__forgot-pass'>
        <Link to='/auth/forgot'>{t("pages.login.forgotPass")}</Link>
      </div>

      <button type='submit' className='login-form__btn'>
        {t("pages.login.title")}
      </button>

      <div className='login-form__not-member'>
        {t("pages.login.notMember")}
        <Link to='/auth/register'>
          <span>{t("pages.login.registerNow")}</span>
        </Link>
      </div>

      <div className='login-form__or'>{t("pages.login.or")}</div>

      <div className='login-form__social'>
        <div
          className='login-form__social-item'
          onClick={handleLoginFacebookSubmit}
        >
          <RiFacebookFill />
        </div>
        <div className='login-form__social-item'>
          <RiGithubFill />
        </div>
        <div className='login-form__social-item'>
          <RiGoogleFill onClick={handleLoginGoogleSubmit} />
        </div>
        <div className='login-form__social-item'>
          <RiLinkedinFill />
        </div>
        <div className='login-form__social-item'>
          <RiTwitterLine />
        </div>
      </div>
    </form>
  );
};

export default LoginForm;

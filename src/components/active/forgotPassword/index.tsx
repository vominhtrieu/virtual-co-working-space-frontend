import { useForm } from "react-hook-form";
import { FaKey } from "react-icons/fa";
import { FormPropsInterface, InputInterface } from "./types";
import InputText from "../../UI/form-controls/inputText";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

const ForgotForm = ({ handleForgotSubmit }: FormPropsInterface) => {
  const { t } = useTranslation();

  const schema = yup.object().shape({
    password: yup
      .string()
      .required(t("default.error.required", { field: t("pages.register.password") }))
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, t("default.error.password", { field: t("pages.register.password") })),
    confirmPassword: yup
      .string()
      .required(t("default.error.required", { field: t("pages.register.confirmPassword") }))
      .oneOf([yup.ref("password")], t("default.error.confirmPassword", { field: t("pages.register.confirmPassword")}))
  });
  const { control, handleSubmit } = useForm<InputInterface>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });

  const onForgotSubmit = (values: InputInterface) => {
    const formValues = {
      password: values["password"],
      confirmPassword: values["confirmPassword"],
    };

    handleForgotSubmit(formValues);
  };

  return (
    <form className='forgot-form' onSubmit={handleSubmit(onForgotSubmit)}>
      <h1 className='forgot-form__title'>{t("pages.login.title")}</h1>

      <div className='forgot-form__input-block'>
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

      <div className='forgot-form__input-block'>
        <InputText
          hasLabel
          type='password'
          name='confirmPassword'
          control={control}
          prefix={<FaKey />}
          size='large'
          placeholder={t("pages.login.password")}
        />
      </div>

      <div className='forgot-form__forgot-pass'>
        <Link to={"#"}>{t("pages.login.forgotPass")}</Link>
      </div>

      <button type='submit' className='forgot-form__btn'>
        {t("pages.login.title")}
      </button>
    </form>
  );
};

export default ForgotForm;

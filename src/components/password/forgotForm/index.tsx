import { useForm } from "react-hook-form";
import { FaKey } from "react-icons/fa";
import { FormPropsInterface, InputInterface } from "./types";
import InputText from "../../UI/form-controls/inputText";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

const ForgotForm= ({ handleForgotSubmit }: FormPropsInterface) => {
  const { t } = useTranslation();

  const schema = yup.object().shape({
    email: yup
    .string()
    .required(t("default.error.required", { field: t("pages.register.email") }))
    .email(t("default.error.email", { field: t("pages.register.email") })),
  });
  const { control, handleSubmit } = useForm<InputInterface>({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(schema),
  });

  const onForgotSubmit = (values: InputInterface) => {
    console.log(values["email"]);
    const formValues = {
      email: values["email"],
    };

    handleForgotSubmit(formValues);
  };

  return (
    <form className='forgot-form' onSubmit={handleSubmit(onForgotSubmit)}>
      <h3 className='forgot-form__title'>Forgot Password</h3>
      <p className='forgot-form__content'> Enter your email to reset password.</p> 
      <div className='forgot-form__input-block'>
        <InputText
          hasLabel
          type='text'
          name='email'
          control={control}
          prefix={<FaKey />}
          size='large'
          placeholder={t("pages.login.email")}
        />
      </div>
      <button type='submit' className='forgot-form__btn'>
        Submit
      </button>

      <div className='register-form__an-account'>
        <Link to='/auth/login'>
          <span>{t('pages.register.login')}</span>
        </Link>
      </div>
    </form>
  );
};

export default ForgotForm;
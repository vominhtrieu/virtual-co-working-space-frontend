import { useForm } from "react-hook-form";
import { FaEnvelope, FaKey, FaUser } from "react-icons/fa";
import { FormPropsInterface, InputInterface } from "./types";
import InputText from "../../UI/form-controls/inputText";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

const RegisterForm = ({ handleRegisterSubmit }: FormPropsInterface) => {
  const { t } = useTranslation();

  const schema = yup.object().shape({
    name: yup
      .string()
      .required(t("default.error.required", { field: t("pages.register.name") }))
      .min(6, t("default.error.minLength", { field: t("pages.register.name"), min: 6 }))
      .max(50, t("default.error.maxLength", { field: t("pages.register.name"), max: 50})),
    email: yup
      .string()
      .required(t("default.error.required", { field: t("pages.register.email") }))
      .email(t("default.error.email", { field: t("pages.register.email") })),
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
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    resolver: yupResolver(schema),
  });

  const onRegisterSubmit = (values: InputInterface) => {
    const formValues = {
      name: values["name"],
      email: values["email"],
      password: values["password"],
      passwordConfirm: values["confirmPassword"],    };

    handleRegisterSubmit(formValues);
  };

  return (
    <form className='register-form' onSubmit={handleSubmit(onRegisterSubmit)}>
      <h1 className='register-form__title'>{t('pages.register.title')}</h1>

      <div className='register-form__input-block'>
        <InputText
          hasLabel
          name='email'
          control={control}
          prefix={<FaUser />}
          size='large'
          placeholder={t('pages.register.email')}
        />
      </div>

      <div className='register-form__input-block'>
        <InputText
          hasLabel
          name='name'
          control={control}
          prefix={<FaEnvelope />}
          size='large'
          placeholder={t('pages.register.name')}
        />
      </div>

      <div className='register-form__input-block'>
        <InputText
          hasLabel
          type='password'
          name='password'
          control={control}
          prefix={<FaKey />}
          size='large'
          placeholder={t('pages.register.password')}
        />
      </div>

      <div className='register-form__input-block'>
        <InputText
          hasLabel
          type='password'
          name='confirmPassword'
          control={control}
          prefix={<FaKey />}
          size='large'
          placeholder={t('pages.register.confirmPassword')}
        />
      </div>

      <button type='submit' className='register-form__btn'>
        {t('pages.register.title')}
      </button>

      <div className='register-form__an-account'>
        {t('pages.register.anAccount')}
        <Link to='/auth/login'>
          <span>{t('pages.register.login')}</span>
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;

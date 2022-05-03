import { useForm } from "react-hook-form";
import { FaKey } from "react-icons/fa";
import { FormPropsInterface, InputInterface } from "./types";
import InputText from "../../UI/form-controls/inputText";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

const ResetForm = ({ handleResetSubmit }: FormPropsInterface) => {
  const { t } = useTranslation();

  const schema = yup.object().shape({
    password: yup
      .string()
      .required(t("default.error.required", { field: t("pages.register.password") }))
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*~])(?=.{8,})/, t("default.error.password", { field: t("pages.register.password") })),
    confirmPassword: yup
      .string()
      .required(t("default.error.required", { field: t("pages.register.confirmPassword") }))
      .oneOf([yup.ref("password")], t("default.error.confirmPassword", { field: t("pages.register.confirmPassword") }))
  });
  const { control, handleSubmit } = useForm<InputInterface>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });

  const onResetSubmit = (values: InputInterface) => {
    const formValues = {
      password: values["password"],
      confirmPassword: values["confirmPassword"],
    };

    console.log(formValues);
    handleResetSubmit(formValues);
  };

  return (
    <form className='reset-form' onSubmit={handleSubmit(onResetSubmit)}>
      <h3 className='reset-form__title'>New Password</h3>
      <p className='reset-form__content'> Enter your email to reset password.</p>
      <div className='reset-form__input-block'>
        <InputText
          hasLabel
          type='password'
          name='password'
          control={control}
          prefix={<FaKey />}
          size='large'
          placeholder="Password"
        />
      </div>

      <div className='reset-form__input-block'>
        <InputText
          hasLabel
          type='password'
          name='confirmPassword'
          control={control}
          prefix={<FaKey />}
          size='large'
          placeholder=" Confirm Password"
        />
      </div>
      <button type='submit' className='reset-form__btn'>
        Submit
      </button>

      <div className='reset-form__an-account'>
        <Link to='/auth/login'>
          <span>{t('pages.register.login')}</span>
        </Link>
      </div>
    </form>
  );
};

export default ResetForm;

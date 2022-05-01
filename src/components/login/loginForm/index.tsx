import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { FaEnvelope, FaKey } from 'react-icons/fa'
import {
  RiFacebookFill,
  RiGithubFill,
  RiGoogleFill,
  RiLinkedinFill,
  RiTwitterLine,
} from 'react-icons/ri'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import InputText from '../../UI/form-controls/inputText'
import { FormPropsInterface, InputInterface } from './types'

const LoginForm = (props: FormPropsInterface) => {
  const { handleLoginSubmit } = props
  const { t } = useTranslation()

  const schema = yup.object().shape({
    email: yup
      .string()
      .required(t('default.error.required', { field: t('pages.login.email') }))
      .email(t('default.error.email', { field: t('pages.login.email') })),
    password: yup
      .string()
      .required(
        t('default.error.required', { field: t('pages.login.password') }),
      )
      .min(
        6,
        t('default.error.minLength', {
          field: t('pages.login.password'),
          min: 6,
        }),
      ),
  })

  const { control, handleSubmit } = useForm<InputInterface>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  })

  const onLoginSubmit = (values: InputInterface) => {
    const formValues = {
      email: values['email'],
      password: values['password'],
    }

    handleLoginSubmit(formValues)
  }

  return (
    <form className="login-form" onSubmit={handleSubmit(onLoginSubmit)}>
      <div className="login-form__title">
        <h1 className="login-form__title-cell">{t('pages.login.title')}</h1>
      </div>
      <div className="login-form__input-block">
        <InputText
          hasLabel
          name="email"
          control={control}
          prefix={<FaEnvelope />}
          size="large"
          placeholder={t('pages.login.email')}
        />
      </div>

      <div className="login-form__input-block">
        <InputText
          hasLabel
          type="password"
          name="password"
          control={control}
          prefix={<FaKey />}
          size="large"
          placeholder={t('pages.login.password')}
        />
      </div>

      <div className="login-form__forgot-pass">
        <Link to="/auth/forgot">{t('pages.login.forgotPass')}</Link>
      </div>

      <button type="submit" className="login-form__btn">
        {t('pages.login.title')}
      </button>

      <div className="login-form__not-member">
        {t('pages.login.notMember')}
        <Link to="/auth/register">
          <span>{t('pages.login.registerNow')}</span>
        </Link>
      </div>

      <div className="login-form__or">{t('pages.login.or')}</div>

      <div className="login-form__social">
        <a href={`${process.env.REACT_APP_BASE_URL}/auth/facebook`}>
          <div className="login-form__social-item">
            <RiFacebookFill />
          </div>
        </a>
        <div className="login-form__social-item">
          <RiGithubFill />
        </div>
        <a href={`${process.env.REACT_APP_BASE_URL}/auth/google`}>
          <div className="login-form__social-item">
            <RiGoogleFill />
          </div>
        </a>
        <div className="login-form__social-item">
          <RiLinkedinFill />
        </div>
        <div className="login-form__social-item">
          <RiTwitterLine />
        </div>
      </div>
    </form>
  )
}

export default LoginForm

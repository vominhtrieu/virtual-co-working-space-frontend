import {useForm} from "react-hook-form";
import {FaEnvelope, FaKey, FaUser} from "react-icons/fa";
import {FormPropsInterface, InputInterface} from "./types";
import InputText from "../../UI/form-controls/input-text";
import {Link} from "react-router-dom";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useTranslation} from "react-i18next";
import {useAppSelector} from '../../../stores'
import {loadSelectors} from '../../../stores/load-slice'
import {Spin} from 'antd'

const RegisterForm = ({handleRegisterSubmit}: FormPropsInterface) => {
    const isLoading = useAppSelector(loadSelectors.getIsLoad);
    const {t} = useTranslation();

    const schema = yup.object().shape({
        name: yup
            .string()
            .required(t("default.error.required", {field: t("pages.register.name")}))
            .min(6, t("default.error.minLength", {field: t("pages.register.name"), min: 6}))
            .max(50, t("default.error.maxLength", {field: t("pages.register.name"), max: 50})),
        email: yup
            .string()
            .required(t("default.error.required", {field: t("pages.register.email")}))
            .email(t("default.error.email", {field: t("pages.register.email")})),
        password: yup
            .string()
            .required(t("default.error.required", {field: t("pages.register.password")}))
            .matches(/^(?=.*[a-z])/, t("default.error.oneLowercase", {field: t("pages.register.password")}))
            .matches(/^(?=.*[A-Z])/, t("default.error.oneUppercase", {field: t("pages.register.password")}))
            .matches(/^(?=.*[0-9])/, t("default.error.oneNumber", {field: t("pages.register.password")}))
            .matches(/^(?=.*[!@#$%^&*~])/, t("default.error.oneSpecial", {field: t("pages.register.password")}))
            .min(8, t("default.error.minLength", {field: t("pages.register.password"), min: 8})),
        confirmPassword: yup
            .string()
            .required(t("default.error.required", {field: t("pages.register.confirmPassword")}))
            .oneOf([yup.ref("password")], t("default.error.confirmPassword", {field: t("pages.register.confirmPassword")}))
    });
    const {control, handleSubmit} = useForm<InputInterface>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            passwordConfirm: "",
        },
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    const onRegisterSubmit = (values: InputInterface) => {
        const formValues = {
            name: values["name"],
            email: values["email"],
            password: values["password"],
            passwordConfirm: values["confirmPassword"],
        };

        handleRegisterSubmit(formValues);
    };

    return (
        <form className='register-form' onSubmit={handleSubmit(onRegisterSubmit)}>
            {/* <h1 className='register-form__title'>{t('pages.register.title')}</h1> */}

            <div className='register-form__input-block'>
                <InputText
                    name='email'
                    control={control}
                    prefix={<FaEnvelope/>}
                    autoComplete="off"
                    size='large'
                    placeholder={t('pages.register.email')}
                    label={t('pages.register.email')}
                />
            </div>

            <div className='register-form__input-block'>
                <InputText
                    name='name'
                    control={control}
                    prefix={<FaUser/>}
                    size='large'
                    autoComplete="off"
                    placeholder={t('pages.register.name')}
                    label={t('pages.register.name')}
                />
            </div>

            <div className='register-form__input-block'>
                <InputText
                    type='password'
                    name='password'
                    autoComplete="off"
                    control={control}
                    prefix={<FaKey/>}
                    size='large'
                    placeholder={t('pages.register.password')}
                    label={t('pages.register.password')}
                />
            </div>

            <div className='register-form__input-block'>
                <InputText
                    type='password'
                    name='confirmPassword'
                    autoComplete="off"
                    control={control}
                    prefix={<FaKey/>}
                    size='large'
                    placeholder={t('pages.register.confirmPassword')}
                    label={t('pages.register.confirmPassword')}
                />
            </div>

            <button type='submit' className='register-form__btn' disabled={isLoading}>
                {isLoading ? <Spin style={{paddingRight: 5}}/> : null}
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

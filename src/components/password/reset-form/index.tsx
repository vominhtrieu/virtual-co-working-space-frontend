import {useForm} from "react-hook-form";
import {FaKey} from "react-icons/fa";
import {FormPropsInterface, InputInterface} from "./types";
import InputText from "../../UI/form-controls/input-text";
import {Link} from "react-router-dom";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useTranslation} from "react-i18next";
import {useAppSelector} from "../../../stores";
import {loadSelectors} from "../../../stores/load-slice";
import {Spin} from "antd";

const ResetForm = ({handleResetSubmit}: FormPropsInterface) => {
    const {t} = useTranslation();
    const isLoading = useAppSelector(loadSelectors.getIsLoad);

    const schema = yup.object().shape({
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
            password: "",
            confirmPassword: "",
        },
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    const onResetSubmit = (values: InputInterface) => {
        const formValues = {
            password: values["password"],
            confirmPassword: values["confirmPassword"],
        };

        handleResetSubmit(formValues);
    };

    return (
        <form className='reset-form' onSubmit={handleSubmit(onResetSubmit)}>
            <h3 className='reset-form__title'>{t('pages.reset.title')}</h3>
            <div className='reset-form__input-block'>
                <InputText
                    type='password'
                    name='password'
                    control={control}
                    prefix={<FaKey/>}
                    size='large'
                    label={t('pages.register.password')}
                    placeholder={t('pages.register.password')}
                />
            </div>

            <div className='reset-form__input-block'>
                <InputText
                    type='password'
                    name='confirmPassword'
                    control={control}
                    prefix={<FaKey/>}
                    size='large'
                    label={t('pages.register.confirmPassword')}
                    placeholder={t('pages.register.confirmPassword')}
                />
            </div>
            <button type='submit' className='reset-form__btn' disabled={isLoading}>
                {isLoading ? <Spin style={{paddingRight: 5}}/> : null}
                {t('pages.forgot.submit')}
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

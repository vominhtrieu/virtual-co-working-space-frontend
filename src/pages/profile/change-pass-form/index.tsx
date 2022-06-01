import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Popup from "../../../components/UI/popup";
import {
  ChangePasswordFormDataInterface,
  ChangePasswordFormProps,
  ChangePasswordInputInterface,
} from "./types";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import InputWhite from "../../../components/UI/form-controls/input-white";

const ChangePasswordForm = (props: ChangePasswordFormProps) => {
  const { onClose, onSubmit } = props;
  const { t } = useTranslation();

  const schema = yup.object().shape({
    oldPassword: yup
      .string()
      .required(t("default.error.required", { field: t("pages.register.password") })),
    newPassword: yup
      .string()
      .required(t("default.error.required", { field: t("pages.register.password") }))
      .matches(/^(?=.*[a-z])/, t("default.error.oneLowercase", { field: t("pages.register.password") }))
      .matches(/^(?=.*[A-Z])/, t("default.error.oneUppercase", { field: t("pages.register.password") }))
      .matches(/^(?=.*[0-9])/, t("default.error.oneNumber", { field: t("pages.register.password") }))
      .matches(/^(?=.*[!@#\$%\^&\*~])/, t("default.error.oneSpecial", { field: t("pages.register.password") }))
      .min(8, t("default.error.minLength", { field: t("pages.register.password"), min: 8 })),
    confirmPassword: yup
      .string()
      .required(t("default.error.required", { field: t("pages.register.confirmPassword") }))
      .oneOf([yup.ref("newPassword")], t("default.error.confirmPassword", { field: t("pages.register.confirmPassword") }))
  });

  const { control, handleSubmit } = useForm<ChangePasswordInputInterface>({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const handleChangePasswordSubmit = (data: ChangePasswordInputInterface) => {
    const formatData: ChangePasswordFormDataInterface = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };
    console.log(formatData);
    onSubmit(formatData);
  };

  return (
    <Popup onClose={onClose} title="Change Password" type="white"onSubmit={handleSubmit(handleChangePasswordSubmit)} hasFooter={true}>
      <form>
        <div className='change-pass-form__input-block'>
          <InputWhite
            control={control}
            type='password'
            name='oldPassword'
            label="Current Password"
            hasLabel
            placeholder='Enter current password'
          />
        </div>

        <div className='change-pass-form__input-block'>
          <InputWhite
            control={control}
            type='password'
            name='newPassword'
            label="New Password"
            hasLabel
            placeholder='Enter new password'
          />
        </div>

        <div className='change-pass-form__input-block'>
          <InputWhite
            control={control}
            type='password'
            name='confirmPassword'
            hasLabel
            label="Password Confirmation"
            placeholder='Enter password confirmation'
          />
        </div>
      </form>
    </Popup>
  );
};

export default ChangePasswordForm;

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "../../../../UI/button";
import InputDate from "../../../../UI/form-controls/inputDate";
import InputText from "../../../../UI/form-controls/inputText";
import {
  EditProfileFormDataInterface,
  EditProfileFormProps,
  EditProfileInputInterface,
} from "./types";
import { useState } from "react";
import { useAppSelector } from "../../../../../stores";
import { userSelectors } from "../../../../../stores/auth-slice";
import { useTranslation } from "react-i18next";
import ProfileAvatar from "./avatar";

const EditProfileForm = (props: EditProfileFormProps) => {
  const { t } = useTranslation();

  const { onClose, onSubmit } = props;

  const userInfo = useAppSelector(userSelectors.getUserInfo);

  const [isAvatar, setIsAvatar] = useState<string>(userInfo.avatar);

  const schema = yup.object().shape({
    name: yup
      .string()
      .required(t("default.error.required", { field: t("pages.register.name") }))
      .min(6, t("default.error.minLength", { field: t("pages.register.name"), min: 6 }))
      .max(50, t("default.error.maxLength", { field: t("pages.register.name"), max: 50 })),
    phone: yup
      .string()
      .required(t("default.error.required", { field: "phone" }))
      .matches(/(((\+)84)|0)(3|5|7|8|9)+([0-9]{8})\b/, t("default.error.phone", { field: "phone" })),
  });

  const { control, handleSubmit } = useForm<EditProfileInputInterface>({
    defaultValues: {
      name: userInfo.name ?? "",
      phone: userInfo.phone ?? "",
      avatar: userInfo.avatar ?? "",
    },
    resolver: yupResolver(schema),
  });

  const handleEditProfileSubmit = (data: EditProfileInputInterface) => {
    const formatData: EditProfileFormDataInterface = {
      name: data.name,
      phone: data.phone,
      avatar: isAvatar,
    };
    onSubmit(formatData);
  };

  return (
    <form onSubmit={handleSubmit(handleEditProfileSubmit)}>
      <ul className='edit-profile__items'>
        {/* user item - start */}
        <li className='edit-profile__item-avatar'>
        <ProfileAvatar size={120} setIsAvatar={setIsAvatar} isAvatar={isAvatar}/>
        </li>
        {/* user item - end */}
        {/* user item - start */}
        <li className='edit-profile__item'>
          <div className='edit-profile__item-title'>Họ và tên:</div>
          <InputText control={control} name='name' />
        </li>
        {/* user item - end */}

        {/* user item - start */}
        <li className='edit-profile__item'>
          <div className='edit-profile__item-title'>Điện thoại:</div>
          <InputText control={control} name='phone' />
        </li>
        {/* user item - end */}
      </ul>

      <div className='edit-profile__group-btn'>
        <Button type='submit' variant='primary'>
          Lưu thay đổi
        </Button>

        <Button type='reset' variant='outlined' onClick={onClose}>
          Huỷ
        </Button>
      </div>
    </form>
  );
};
export default EditProfileForm;

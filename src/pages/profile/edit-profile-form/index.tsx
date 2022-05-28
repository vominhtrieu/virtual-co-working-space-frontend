import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "../../../components/UI/button";
import Popup from "../../../components/UI/popup";
import InputText from "../../../components/UI/form-controls/input-text";
import {
  EditProfileFormDataInterface,
  EditProfileFormProps,
  EditProfileInputInterface,
} from "./types";
import { useState } from "react";
import { useAppSelector } from "../../../stores";
import { userSelectors } from "../../../stores/auth-slice";
import { loadSelectors } from "../../../stores/load-slice";
import { useTranslation } from "react-i18next";
import { Spin } from "antd";
import ProfileAvatar from "./avatar";

const EditProfileForm = (props: EditProfileFormProps) => {
  const { t } = useTranslation();

  const { onClose, onSubmit } = props;

  const userInfo = useAppSelector(userSelectors.getUserInfo);

  const [isAvatar, setIsAvatar] = useState<string>(userInfo.avatar);
  const isLoading = useAppSelector(loadSelectors.getIsLoad)

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

  const formatPhoneNumber = (phone) => {
    phone = phone.trim();
    if (phone[0] === '0') {
      return "+84" + phone.slice(1, 10);
    }
    return phone;
  }

  const handleEditProfileSubmit = (data: EditProfileInputInterface) => {
    const formatData: EditProfileFormDataInterface = {
      name: data.name,
      phone: formatPhoneNumber(data.phone),
      avatar: isAvatar,
    };
    onSubmit(formatData);
  };

  return (
    <Popup onClose={onClose}>
      <form onSubmit={handleSubmit(handleEditProfileSubmit)}>
        <ul className='edit-profile__items'>
          {/* user item - start */}
          <li className='edit-profile__item-avatar'>
            <ProfileAvatar size={120} setIsAvatar={setIsAvatar} isAvatar={isAvatar} />
          </li>
          {/* user item - end */}
          <div className='change-pass-form__input-block'>
            <InputText
              control={control}
              type='text'
              name='name'
              label="Name"
              hasLabel
              placeholder='Enter name...'
            />
          </div>

          <div className='change-pass-form__input-block'>
            <InputText
              control={control}
              type='text'
              name='phone'
              label="Phone Number"
              hasLabel
              placeholder='Enter phone number...'
            />
          </div>
        </ul>

        <div className='edit-profile__group-btn'>


          <Button type='reset' className="cancel" onClick={onClose}>
            Cancel
          </Button>

          <Button type='submit' className="ok" disabled={isLoading}>
            {isLoading ? <Spin style={{ paddingRight: 5 }} /> : null}
            Submit
          </Button>
        </div>
      </form>
    </Popup>
  );
};
export default EditProfileForm;

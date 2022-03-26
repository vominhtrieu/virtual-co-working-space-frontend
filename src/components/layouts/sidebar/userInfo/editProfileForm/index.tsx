import { useForm } from "react-hook-form";
import Button from "../../../../UI/button";
import InputDate from "../../../../UI/form-controls/inputDate";
import InputText from "../../../../UI/form-controls/inputText";
import {
  EditProfileFormDataInterface,
  EditProfileFormProps,
  EditProfileInputInterface,
} from "./types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const EditProfileForm = (props: EditProfileFormProps) => {
  const { onClose, onSubmit } = props;

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup.string().required("Phone is required"),
    createdAt: yup.string().required("Join date is required"),
  });

  const { control, handleSubmit } = useForm<EditProfileInputInterface>({
    defaultValues: {
      name: "Võ Minh Triều",
      email: "vmtrieu@gmail.com",
      phone: "0123456789",
      createdAt: "01/01/2015",
    },
    resolver: yupResolver(schema),
  });

  const handleEditProfileSubmit = (data: EditProfileInputInterface) => {
    const formatData: EditProfileFormDataInterface = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      createdAt: data.createdAt,
    };
    onSubmit(formatData);
  };

  return (
    <form onSubmit={handleSubmit(handleEditProfileSubmit)}>
      <ul className='edit-profile__items'>
        {/* user item - start */}
        <li className='edit-profile__item'>
          <div className='edit-profile__item-title'>Họ và tên:</div>
          <InputText control={control} name='name' />
        </li>
        {/* user item - end */}
        {/* user item - start */}
        <li className='edit-profile__item'>
          <div className='edit-profile__item-title'>Email:</div>
          <InputText control={control} name='email' />
        </li>
        {/* user item - end */}
        {/* user item - start */}
        <li className='edit-profile__item'>
          <div className='edit-profile__item-title'>Điện thoại:</div>
          <InputText control={control} name='phone' />
        </li>
        {/* user item - end */}
        {/* user item - start */}
        <li className='edit-profile__item'>
          <div className='edit-profile__item-title'>Ngày tham gia:</div>
          <InputDate control={control} name='createdAt' />
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

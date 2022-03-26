import { useForm } from "react-hook-form";
import Button from "../../../../UI/button";
import InputDate from "../../../../UI/form-controls/inputDate";
import InputText from "../../../../UI/form-controls/inputText";
import { EditProfileInputInterface } from "./types";

const EditProfileForm = () => {
  const { control, handleSubmit } = useForm<EditProfileInputInterface>({
    defaultValues: {
      name: "Võ Minh Triều",
      email: "vmtrieu@gmail.com",
      phone: "0123456789",
      createdAt: "01/01/2015",
    },
  });

  const handleEditProfileSubmit = (data: EditProfileInputInterface) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(handleEditProfileSubmit)}>
      <ul className='sidebar-user__items'>
        {/* user item - start */}
        <li className='sidebar-user__item'>
          <div className='sidebar-user__item-title'>Họ và tên:</div>
          <InputText control={control} name='name' />
        </li>
        {/* user item - end */}
        {/* user item - start */}
        <li className='sidebar-user__item'>
          <div className='sidebar-user__item-title'>Email:</div>
          <InputText control={control} name='email' />
        </li>
        {/* user item - end */}
        {/* user item - start */}
        <li className='sidebar-user__item'>
          <div className='sidebar-user__item-title'>Điện thoại:</div>
          <InputText control={control} name='phone' />
        </li>
        {/* user item - end */}
        {/* user item - start */}
        <li className='sidebar-user__item'>
          <div className='sidebar-user__item-title'>Ngày tham gia:</div>
          <InputDate control={control} name='createdAt' />
        </li>
        {/* user item - end */}
      </ul>

      <div className='sidebar-user__group-btn'>
        <Button type='submit' variant='primary'>
          Lưu thay đổi
        </Button>

        <Button type='reset' variant='outlined'>
          Huỷ
        </Button>
      </div>
    </form>
  );
};
export default EditProfileForm;

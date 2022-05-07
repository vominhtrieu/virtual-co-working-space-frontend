import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "../../UI/button";
import { useState } from "react";
import InputText from "../../UI/form-controls/inputText";
import {
  EditOfficeDetailFormFormDataInterface,
  EditOfficeDetailFormInputInterface,
  EditOfficeDetailFormProps,
} from "./types";
import OfficeAvatar from "./avatar";

const EditOfficeForm = (props: EditOfficeDetailFormProps) => {
  const { onClose, onSubmit, officeDetail } = props;
  const [isAvatar, setIsAvatar] = useState<string>(officeDetail?.avatarUrl);

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
  });

  const { control, handleSubmit } = useForm<EditOfficeDetailFormInputInterface>(
    {
      defaultValues: {
        name: "",
        avatarUrl: isAvatar,
      },
      resolver: yupResolver(schema),
    }
  );

  const handleEditProfileSubmit = (
    data: EditOfficeDetailFormInputInterface
  ) => {
    const formatData: EditOfficeDetailFormFormDataInterface = {
      name: data.name,
      avatarUrl: isAvatar,
    };
    console.log(formatData.avatarUrl);
    onSubmit(formatData);
  };

  return (
    <form onSubmit={handleSubmit(handleEditProfileSubmit)}>
      <h1 className='edit-detail-office__title'>Chỉnh sửa</h1>

      <div className="edit-detail-office__item-avatar">
        <OfficeAvatar size={120} setIsAvatar={setIsAvatar} isAvatar={isAvatar} />
      </div>

      <InputText control={control} name='name' hasLabel />
      <div className='edit-detail-office__group-btn'>
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
export default EditOfficeForm;

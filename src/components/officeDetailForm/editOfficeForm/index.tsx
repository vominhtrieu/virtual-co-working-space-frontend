import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "../../UI/button";
import InputText from "../../UI/form-controls/inputText";
import {
  EditOfficeDetailFormFormDataInterface,
  EditOfficeDetailFormInputInterface,
  EditOfficeDetailFormProps,
} from "./types";

const EditOfficeForm = (props: EditOfficeDetailFormProps) => {
  const { onClose, onSubmit } = props;

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
  });

  const { control, handleSubmit } = useForm<EditOfficeDetailFormInputInterface>(
    {
      defaultValues: {
        name: "",
      },
      resolver: yupResolver(schema),
    }
  );

  const handleEditProfileSubmit = (
    data: EditOfficeDetailFormInputInterface
  ) => {
    const formatData: EditOfficeDetailFormFormDataInterface = {
      name: data.name,
    };
    onSubmit(formatData);
  };

  return (
    <form onSubmit={handleSubmit(handleEditProfileSubmit)}>
      <h1 className='edit-profile__title'>Chỉnh sửa</h1>

      <InputText control={control} name='name' placeholder='Tên' hasLabel />

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
export default EditOfficeForm;

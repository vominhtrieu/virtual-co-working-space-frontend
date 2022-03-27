import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "../../../../UI/button";
import InputText from "../../../../UI/form-controls/inputText";
import Popup from "../../../../UI/popup";
import {
  CreateOfficeFormDataInterface,
  CreateOfficeFormInputInterface,
  CreateOfficeFormProps,
} from "./types";

const CreateOfficeForm = (props: CreateOfficeFormProps) => {
  const { onClose, onSubmit } = props;

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup.string().required("Phone is required"),
    createdAt: yup.string().required("Join date is required"),
  });

  const { control, handleSubmit } = useForm<CreateOfficeFormInputInterface>({
    defaultValues: {
      name: "",
    },
    resolver: yupResolver(schema),
  });

  const handleCreateOfficeSubmit = (data: CreateOfficeFormInputInterface) => {
    const formatData: CreateOfficeFormDataInterface = {
      name: data.name,
    };
    onSubmit(formatData);
  };
  return (
    <Popup onClose={onClose}>
      <form onSubmit={handleSubmit(handleCreateOfficeSubmit)}>
        <h1 className='create-office-form__title'>Tạo văn phòng</h1>

        <div className='create-office-form__input-block'>
          <InputText
            control={control}
            name='name'
            hasLabel
            placeholder='Tên văn phòng'
          />
        </div>

        <div className='create-office-form__group-btn'>
          <Button type='submit' variant='primary'>
            Tạo
          </Button>

          <Button type='reset' variant='outlined' onClick={onClose}>
            Huỷ
          </Button>
        </div>
      </form>
    </Popup>
  );
};

export default CreateOfficeForm;

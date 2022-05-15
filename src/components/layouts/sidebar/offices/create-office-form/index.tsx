import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "../../../../UI/button";
import InputText from "../../../../UI/form-controls/input-text";
import Popup from "../../../../UI/popup";
import {
  CreateOfficeFormDataInterface,
  CreateOfficeFormInputInterface,
  CreateOfficeFormProps,
} from "./types";
import { useAppSelector } from "../../../../../stores";
import { loadSelectors } from "../../../../../stores/load-slice";
import { Spin } from "antd";

const CreateOfficeForm = (props: CreateOfficeFormProps) => {
  const { onClose, onSubmit } = props;
  const isLoading = useAppSelector(loadSelectors.getIsLoad);

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
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
          <Button type='submit' variant='primary' disabled={isLoading}>
          {isLoading ? <Spin style={{ paddingRight: 5 }} /> : null}
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

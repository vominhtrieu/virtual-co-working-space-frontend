import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "../../UI/button";
import { useState } from "react";
import InputText from "../../UI/form-controls/input-text";
import {
  EditOfficeDetailFormFormDataInterface,
  EditOfficeDetailFormInputInterface,
  EditOfficeDetailFormProps,
} from "./types";
import OfficeAvatar from "./avatar";
import { useAppSelector } from "../../../stores";
import { loadSelectors } from "../../../stores/load-slice";
import { Spin } from "antd";

const EditOfficeForm = (props: EditOfficeDetailFormProps) => {
  const { onClose, onSubmit, officeDetail } = props;
  const [isAvatar, setIsAvatar] = useState<string>(officeDetail?.avatarUrl);
  const isLoading = useAppSelector(loadSelectors.getIsLoad);

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
  });

  const { control, handleSubmit } = useForm<EditOfficeDetailFormInputInterface>(
    {
      defaultValues: {
        name: officeDetail?.name,
        avatarUrl: isAvatar,
        description: officeDetail?.description,
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
      description: data.description,
    };
    onSubmit(formatData);
  };

  return (
    <form onSubmit={handleSubmit(handleEditProfileSubmit)}>
      <div className="edit-detail-office__item-avatar">
        <OfficeAvatar size={120} setIsAvatar={setIsAvatar} isAvatar={isAvatar} />
      </div>

      <div className="edit-detail-office__item-input">
        <InputText control={control} name='name' label="Name" />

      </div>

      <div className="edit-detail-office__item-input">
        <InputText control={control} name='description' label="Description" />

      </div>


      <div className='edit-detail-office__group-btn'>
        <Button type='submit' variant='primary' disabled={isLoading}>
          {isLoading ? <Spin style={{ paddingRight: 5 }} /> : null}
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

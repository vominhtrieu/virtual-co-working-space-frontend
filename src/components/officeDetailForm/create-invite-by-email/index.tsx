import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "../../UI/button";
import { useState } from "react";
import InputText from "../../UI/form-controls/inputText";
import {
  FormDataInterface,
  FormInputInterface,
  FormProps,
} from "./types";

const CreateInvitationForm = (props: FormProps) => {
  const { onClose, handleCreate, officeDetail } = props;

  const schema = yup.object().shape({
    email: yup.string().required("Email is required"),
  });

  const { control, handleSubmit } = useForm<FormInputInterface>(
    {
      defaultValues: {
        email: "",
        officeId: officeDetail?.id??0,
      },
      resolver: yupResolver(schema),
    }
  );

  const handleEditProfileSubmit = (
    data: FormInputInterface
  ) => {
    const formatData: FormDataInterface = {
      email: data.email,
      officeId: officeDetail?.id??0,
    };
    handleCreate(formatData);
  };

  return (
    <form onSubmit={handleSubmit(handleEditProfileSubmit)}>
      <h1 className='edit-detail-office__title'>Gửi lời mời</h1>
      <InputText control={control} name='email' hasLabel />
      <div className='edit-detail-office__group-btn'>
        <Button type='submit' variant='primary'>
          Gửi
        </Button>

        <Button type='reset' variant='outlined' onClick={onClose}>
          Huỷ
        </Button>
      </div>
    </form>
  );
};
export default CreateInvitationForm;

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Popup from "../../../../UI/popup";
import {
  ChangePasswordFormDataInterface,
  ChangePasswordFormProps,
  ChangePasswordInputInterface,
} from "./types";
import * as yup from "yup";
import InputText from "../../../../UI/form-controls/inputText";
import Button from "../../../../UI/button";

const ChangePasswordForm = (props: ChangePasswordFormProps) => {
  const { onClose, onSubmit } = props;

  const schema = yup.object().shape({
    password: yup.string().required("Password is required"),
    confirmPassword: yup.string().required("Confirm password is required"),
  });

  const { control, handleSubmit } = useForm<ChangePasswordInputInterface>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });

  const handleChangePasswordSubmit = (data: ChangePasswordInputInterface) => {
    const formatData: ChangePasswordFormDataInterface = {
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
    onSubmit(formatData);
  };

  return (
    <Popup onClose={onClose}>
      <form onSubmit={handleSubmit(handleChangePasswordSubmit)}>
        <h1 className='change-pass-form__title'>Thay đổi mật khẩu</h1>

        <div className='change-pass-form__input-block'>
          <InputText
            control={control}
            name='password'
            hasLabel
            placeholder='Mật khẩu mới'
          />
        </div>

        <div className='change-pass-form__input-block'>
          <InputText
            control={control}
            name='confirmPassword'
            hasLabel
            placeholder='Nhập lại mật khẩu mới'
          />
        </div>

        <div className='change-pass-form__group-btn'>
          <Button type='submit' variant='primary'>
            Thay đổi
          </Button>

          <Button type='reset' variant='outlined' onClick={onClose}>
            Huỷ
          </Button>
        </div>
      </form>
    </Popup>
  );
};

export default ChangePasswordForm;

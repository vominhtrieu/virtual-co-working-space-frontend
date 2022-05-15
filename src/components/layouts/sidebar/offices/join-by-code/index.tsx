import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "../../../../UI/button";
import InputText from "../../../../UI/form-controls/input-text";
import Popup from "../../../../UI/popup";
import {
  JoinOfficeFormDataInterface,
  JoinOfficeFormInputInterface,
  JoinOfficeFormProps,
} from "./types";
import { useAppSelector } from "../../../../../stores";
import { loadSelectors } from "../../../../../stores/load-slice";
import { Spin } from "antd";

const JoinOfficeForm = (props: JoinOfficeFormProps) => {
  const { onClose, onSubmit } = props;
  
  const isLoading = useAppSelector(loadSelectors.getIsLoad);

  const schema = yup.object().shape({
    code: yup.string().required("Code is required"),
  });

  const { control, handleSubmit } = useForm<JoinOfficeFormInputInterface>({
    defaultValues: {
      code: "",
    },
    resolver: yupResolver(schema),
  });

  const handleJoinOfficeSubmit = (data: JoinOfficeFormInputInterface) => {
    const formatData: JoinOfficeFormDataInterface = {
      id: data.code,
    };
    console.log(formatData);
    onSubmit(formatData);
    onClose();
  };
  return (
    <Popup onClose={onClose}>
      <form onSubmit={handleSubmit(handleJoinOfficeSubmit)}>
        <h1 className='join-office-form__title'>Tham gia văn phòng</h1>

        <div className='join-office-form__input-block'>
          <InputText
            control={control}
            name='code'
            hasLabel
            placeholder='Mã code'
          />
        </div>

        <div className='join-office-form__group-btn'>
          <Button type='submit' variant='primary' disabled={isLoading}>
          {isLoading ? <Spin style={{ paddingRight: 5 }} /> : null}
            Tham gia
          </Button>

          <Button type='reset' variant='outlined' onClick={onClose}>
            Huỷ
          </Button>
        </div>
      </form>
    </Popup>
  );
};

export default JoinOfficeForm;
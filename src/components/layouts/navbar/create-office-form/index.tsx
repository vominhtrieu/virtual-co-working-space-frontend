import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputWhite from "../../../UI/form-controls/input-white";
import Popup from "../../../UI/popup";
import {
  CreateOfficeFormDataInterface,
  CreateOfficeFormInputInterface,
  CreateOfficeFormProps,
} from "./types";
import { useAppSelector } from "../../../../stores";
import { loadSelectors } from "../../../../stores/load-slice";
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
    <Popup onClose={onClose} title="Create office" type="white" onSubmit={handleSubmit(handleCreateOfficeSubmit)}>
      <form>
        <div className='create-office-form__input-block'>
          <InputWhite
            control={control}
            name='name'
            label='Name'
            hasLabel
            placeholder='Enter the office name...'
          />
        </div>
      </form>
    </Popup>
  );
};

export default CreateOfficeForm;

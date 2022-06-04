import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputText from "../../../UI/form-controls/input-text";
import Popup from "../../../UI/popup";
import {
  UpdateConversationFormInput,
  UpdateConversationFormProps,
} from "./types";

const UpdateConversationForm = (props: UpdateConversationFormProps) => {
  const { onClose, onSubmit } = props;

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
  });

  const { control, handleSubmit } = useForm<UpdateConversationFormInput>({
    defaultValues: {
      name: "",
    },
    resolver: yupResolver(schema),
  });

  const handleUpdateConversationSubmit = (values) => {
    const formValues = {
      ...values,
    };

    onSubmit(formValues);
    onClose();
  };

  return (
    <Popup
      title="Đổi tên hội thoại"
      onClose={onClose}
      onSubmit={handleSubmit(handleUpdateConversationSubmit)}
      type="dark"
      hasFooter
    >
      <form onSubmit={handleSubmit(handleUpdateConversationSubmit)}>
        <div className="create-conversation-form__input-block">
          <InputText
            name="name"
            control={control}
            hasLabel
            label="Tên hội thoại"
          />
        </div>
      </form>
    </Popup>
  );
};

export default UpdateConversationForm;

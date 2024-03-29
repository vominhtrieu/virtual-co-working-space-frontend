import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "../../UI/button";
import InputText from "../../UI/form-controls/input-text";
import { FormDataInterface, FormInputInterface, FormProps } from "./types";
import { useAppSelector } from "../../../stores";
import { loadSelectors } from "../../../stores/load-slice";
import { Spin } from "antd";
import { useTranslation } from "react-i18next";

const CreateInvitationForm = (props: FormProps) => {
  const { onClose, handleCreate, officeDetail } = props;
  const { t } = useTranslation();

  const isLoading = useAppSelector(loadSelectors.getIsLoad);

  const schema = yup.object().shape({
    email: yup.string().required("Email is required"),
  });

  const { control, handleSubmit } = useForm<FormInputInterface>({
    defaultValues: {
      email: "",
      officeId: officeDetail?.id ?? 0,
    },
    resolver: yupResolver(schema),
  });

  const handleEditProfileSubmit = (data: FormInputInterface) => {
    const formatData: FormDataInterface = {
      email: data.email,
      officeId: officeDetail?.id ?? 0,
    };
    handleCreate(formatData);
  };

  return (
    <form onSubmit={handleSubmit(handleEditProfileSubmit)}>
      <h1 className="send-email-office__title">
        {t("pages.office.officeDetail.invite")}
      </h1>
      <div className="send-email-office__input">
        <InputText control={control} name="email" label="Email" />
      </div>
      <div className="send-email-office__group-btn">
        <Button type="submit" variant="primary" disabled={isLoading}>
          {isLoading ? <Spin style={{ paddingRight: 5 }} /> : null}
          {t("default.action.send")}
        </Button>

        <Button type="reset" variant="outlined" onClick={onClose}>
          {t("default.action.cancel")}
        </Button>
      </div>
    </form>
  );
};
export default CreateInvitationForm;

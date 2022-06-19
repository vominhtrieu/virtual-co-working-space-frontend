import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Popup from "../../components/UI/popup";
import {
  CreateOfficeFormInputInterface,
  CreateOfficeFormDataInterface,
  JoinOfficeFormInputInterface,
  JoinOfficeFormDataInterface,
} from "./types";
import { toastError, toastSuccess } from "../../helpers/toast";
import JoinByCodeProxy from "../../services/proxy/office-invitation/join-invite-code";
import CreateOfficeProxy from "../../services/proxy/offices/create-office";
import { ProxyStatusEnum } from "../../types/http/proxy/ProxyStatus";
import NewButton from "../../components/UI/new-button";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import InputText from "../../components/UI/form-controls/input-text";
import { useTranslation } from "react-i18next";

interface JoinOrCreateOfficeModalProps {
  onClose: () => void;
  onInsertOffice: (data: any) => void;
}

export default function JoinOrCreateOfficeModal({
  onClose,
  onInsertOffice,
}: JoinOrCreateOfficeModalProps) {
  const [isCreating, setIsCreating] = useState<boolean>(true);

  const { t } = useTranslation();

  const createOfficeSchema = yup.object().shape({
    name: yup.string().required(t("default.error.required", { field: "name" })),
  });
  const joinOfficeSchema = yup.object().shape({
    code: yup.string().required(t("default.error.required", { field: "code" })),
  });

  const handleJoinOfficeSubmit = (data: JoinOfficeFormInputInterface) => {
    const formatData: JoinOfficeFormDataInterface = {
      id: data.code,
    };
    JoinByCodeProxy(formatData)
      .then((res) => {
        if (res.status === ProxyStatusEnum.FAIL) {
          toastError(res.message ?? t("default.noti.joinOfficeFailed"));
          return;
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          toastSuccess(t("default.noti.joinOfficeSuccess"));
          onInsertOffice(res.data.office);
          onClose();
          return;
        }
      })
      .catch((err) => {
        toastError(err.message ?? t("default.noti.joinOfficeFailed"));
      });
  };
  const { control: joinOfficeControl, handleSubmit: joinOfficeHandleSubmit } =
    useForm<JoinOfficeFormInputInterface>({
      defaultValues: {
        code: "",
      },
      resolver: yupResolver(joinOfficeSchema),
    });
  const {
    control: createOfficeControl,
    handleSubmit: createOfficeHandleSubmit,
  } = useForm<CreateOfficeFormInputInterface>({
    defaultValues: {
      name: "",
    },
    resolver: yupResolver(createOfficeSchema),
  });

  const handleCreateOfficeSubmit = (data: CreateOfficeFormInputInterface) => {
    const values: CreateOfficeFormDataInterface = {
      name: data.name,
    };
    CreateOfficeProxy(values)
      .then((res) => {
        if (res.status === ProxyStatusEnum.FAIL) {
          toastError(res.message ?? t("default.noti.createOfficeFailed"));
          return;
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          toastSuccess(t("default.noti.createOfficeSuccess"));
          console.log(data);
          onInsertOffice(res.data.office);
          onClose();
          return;
        }
      })
      .catch((err) => {
        toastError(err.message ?? t("default.noti.createOfficeFailed"));
      });
  };

  return (
    <Popup
      onClose={onClose}
      title={
        (isCreating ? t("default.action.create") : t("default.action.join")) +
        " " +
        t("pages.office.title")
      }
      type="dark"
      onSubmit={
        isCreating
          ? createOfficeHandleSubmit(handleCreateOfficeSubmit)
          : joinOfficeHandleSubmit(handleJoinOfficeSubmit)
      }
      hasFooter
      customButton={
        <NewButton
          variant="outlined"
          icon={<FaPlus />}
          onClick={() => setIsCreating(!isCreating)}
          content={
            isCreating
              ? t("pages.lobby.createForm.joinByCode")
              : t("pages.lobby.createForm.createNew")
          }
        />
      }
    >
      {isCreating ? (
        <form>
          <div className="create-office-form__input-block">
            <InputText
              control={createOfficeControl}
              name="name"
              label={t("pages.lobby.createForm.name")}
              placeholder={t("pages.lobby.createForm.enterName")}
            />
            <InputText
              control={createOfficeControl}
              name="description"
              label={t("pages.lobby.createForm.description")}
              placeholder={t("pages.lobby.createForm.enterDescription")}
            />
          </div>
        </form>
      ) : (
        <form>
          <InputText
            control={joinOfficeControl}
            name="code"
            label={t("pages.lobby.createForm.code")}
            placeholder={t("pages.lobby.createForm.enterCode")}
          />
        </form>
      )}
    </Popup>
  );
}

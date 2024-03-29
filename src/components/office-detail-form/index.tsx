import { Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaLink, FaLocationArrow } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../../helpers/toast";
import { leaveOffice } from "../../services/api/offices/leave-office";
import CreateByEmailProxy from "../../services/proxy/office-invitation/create-by-email";
import DeleteOfficeProxy from "../../services/proxy/offices/delete-office";
import OfficeDetailProxy from "../../services/proxy/offices/office-detail";
import UpdateOfficeProxy from "../../services/proxy/offices/update-office";
import { useAppDispatch, useAppSelector } from "../../stores";
import { loadSelectors } from "../../stores/load-slice";
import { officeSelectors, setIsOffice } from "../../stores/office-slice";
import { ProxyStatusEnum } from "../../types/http/proxy/ProxyStatus";
import Button from "../UI/button";
import Popup from "../UI/popup";
import CreateInvitationForm from "./create-invite-by-email";
import DeleteOfficeForm from "./delete-office-form";
import EditOfficeForm from "./edit-office-form";
import {
  CreateInvitationFormValuesInterface,
  EditOfficeDetailFormValuesInterface,
  OfficeDetailFormProps,
  OfficeDetailInterface
} from "./types";

const OfficeDetailForm = (props: OfficeDetailFormProps) => {
  const [officeDetail, setOfficeDetail] = useState<OfficeDetailInterface>();
  const navigate = useNavigate();
  const { onClose, id, isOwner } = props;

  const { t } = useTranslation();

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreate, setIsCreate] = useState(false);

  const isOffice = useAppSelector(officeSelectors.getIsOffice);
  const isLoading = useAppSelector(loadSelectors.getIsLoad);
  const dispatch = useAppDispatch();
  const arrThumnail: number[] = [0, 1, 2, 3];

  useEffect(() => {
    OfficeDetailProxy({ id: id })
      .then((res) => {
        if (res.status === ProxyStatusEnum.FAIL) {
          return;
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          setOfficeDetail(res.data.office ?? {});
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleEdit = (values: EditOfficeDetailFormValuesInterface) => {
    UpdateOfficeProxy({
      id: id,
      name: values.name,
      avatar: values.avatarUrl,
      description: values.description,
    })
      .then((res) => {
        if (res.status === ProxyStatusEnum.FAIL) {
          toastError(t(`error.${res.message}`) ?? "Update office fail");
          return;
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          toastSuccess("Update office success");
          dispatch(setIsOffice(!isOffice));
          onClose();
          setIsEditing(false);
        }
      })
      .catch((err) => { });
  };

  const handleDelete = () => {
    DeleteOfficeProxy({ id: id })
      .then((res) => {
        if (res.status === ProxyStatusEnum.FAIL) {
          toastError(t(`error.${res.message}`) ?? "Delete office fail");
          return;
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          toastSuccess("Delete office success");
          onClose();
          setIsDeleting(false);
          navigate("/lobby");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCreateInvitation = (
    values: CreateInvitationFormValuesInterface
  ) => {
    CreateByEmailProxy({ email: values.email, officeId: values.officeId })
      .then((res) => {
        if (res.status === ProxyStatusEnum.FAIL) {
          toastError(t(`error.${res.message}`) ?? "Create invitation fail");
          return;
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          toastSuccess("Create invitation success");
          dispatch(setIsOffice(!isOffice));

          onClose();
          setIsCreate(false);
        }
      })
      .catch((err) => { });
  };

  const padTo2Digits = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  const parseStringToDate = (dateSTr) => {
    if (dateSTr) {
      const date = new Date(dateSTr);
      return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
      ].join("/");
    }
    return "";
  };

  const copy = async (code) => {
    await navigator.clipboard.writeText(
      `${window.location.host}/invites/${code}`
    );
    toastSuccess("Copy success");
  };

  const DetailForm = (
    <>
      {isLoading ? (
        <div className="office-detail-form">
          <Skeleton.Button className="office-detail-form__title" />

          {arrThumnail?.map(() => (
            <li className="office-detail-form__item">
              <Skeleton.Button className="office-detail-form__item-title" />
              <Skeleton.Button className="office-detail-form__item-content" />
            </li>
          ))}
          <div className="office-detail-form__group-btn">
            <Skeleton.Button />
            <Skeleton.Button />
          </div>
        </div>
      ) : (
        <div className="office-detail-form">
          <ul className="office-detail-form__items">
            {/* user item - start */}
            <li className="office-detail-form__item">
              <div className="office-detail-form__item-title">
                {t("pages.office.officeDetail.name")}:
              </div>
              <div className="office-detail-form__item-content">
                {officeDetail?.name}
              </div>
            </li>
            {/* user item - end */}
            {/* user item - start */}
            <li className="office-detail-form__item">
              <div className="office-detail-form__item-title">
                {t("pages.office.officeDetail.code")}:
              </div>
              <div className="office-detail-form__item-content-url">
                {officeDetail ? (
                  <>
                    <div>{officeDetail?.invitationCode}</div>
                    <div>
                      <FaLocationArrow
                        style={{ marginRight: "1rem", cursor: "pointer" }}
                        onClick={() => {
                          setIsCreate(true);
                        }}
                      />
                      <FaLink
                        style={{ cursor: "pointer" }}
                        onClick={() => copy(officeDetail?.invitationCode)}
                      />
                    </div>
                  </>
                ) : null}
              </div>
            </li>
            {/* user item - end */}
            {/* user item - start */}
            <li className="office-detail-form__item">
              <div className="office-detail-form__item-title">
                {t("pages.office.officeDetail.createAt")}:
              </div>
              <div className="office-detail-form__item-content">
                {parseStringToDate(officeDetail?.createdAt)}
              </div>
            </li>
            {/* user item - end */}
            {/* user item - start */}
            <li className="office-detail-form__item">
              <div className="office-detail-form__item-title">
                {t("pages.office.officeDetail.description")}:
              </div>
              <div className="office-detail-form__item-content">
                {officeDetail?.description}
              </div>
            </li>
            {/* user item - end */}
          </ul>
          {isOwner && (
            <div className="office-detail-form__group-btn">
              <Button
                variant="primary"
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                {t("default.action.edit")}
              </Button>
              <Button
                type="reset"
                variant="outlined"
                onClick={() => {
                  setIsDeleting(true);
                }}
              >
                {t("default.action.delete")}
              </Button>
            </div>
          )}
          {!isOwner && (
            <div className="office-detail-form__group-btn">
              <Button
                variant="primary"
                onClick={() => {
                  leaveOffice({ id: officeDetail?.id ?? 0 }).then(res => {
                    if (res.code !== 200) return;
                    navigate("/lobby")
                  })
                }}
              >
                {t("default.action.leave")}
              </Button>

            </div>
          )}
        </div>
      )}
    </>
  );

  return (
    <Popup
      onClose={onClose}
      title={t("pages.office.officeDetail.title")}
      type="dark"
      hasFooter={false}
    >
      {isEditing && officeDetail ? (
        <EditOfficeForm
          onClose={() => {
            setIsEditing(false);
          }}
          onSubmit={handleEdit}
          officeDetail={officeDetail}
        />
      ) : isDeleting ? (
        <DeleteOfficeForm
          onClose={() => {
            setIsDeleting(false);
          }}
          handleDelete={handleDelete}
        />
      ) : isCreate && officeDetail ? (
        <CreateInvitationForm
          onClose={() => {
            setIsCreate(false);
          }}
          handleCreate={handleCreateInvitation}
          officeDetail={officeDetail}
        />
      ) : (
        DetailForm
      )}
    </Popup>
  );
};
export default OfficeDetailForm;

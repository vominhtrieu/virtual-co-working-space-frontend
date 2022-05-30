import { useEffect, useState } from "react";
import { toastError, toastSuccess } from "../../helpers/toast";
import OfficeDetailProxy from "../../services/proxy/offices/office-detail";
import UpdateOfficeProxy from "../../services/proxy/offices/update-office";
import DeleteOfficeProxy from "../../services/proxy/offices/delete-office";
import CreateByEmailProxy from "../../services/proxy/office-invitation/create-by-email";
import { ProxyStatusEnum } from "../../types/http/proxy/ProxyStatus";
import Button from "../UI/button";
import Popup from "../UI/popup";
import EditOfficeForm from "./edit-office-form";
import CreateInvitationForm from "./create-invite-by-email";
import {
  EditOfficeDetailFormValuesInterface,
  CreateInvitationFormValuesInterface,
  OfficeDetailFormProps,
  OfficeDetailInterface,
} from "./types";
import DeleteOfficeForm from "./delete-office-form";
import { useAppDispatch, useAppSelector } from "../../stores";
import { setIsOffice } from "../../stores/office-slice";
import { officeSelectors } from "../../stores/office-slice";
import { FaLink, FaLocationArrow } from "react-icons/fa";
import { loadSelectors } from "../../stores/load-slice";
import { Skeleton } from "antd";

const OfficeDetailForm = (props: OfficeDetailFormProps) => {
  const [officeDetail, setOfficeDetail] = useState<OfficeDetailInterface>();
  const { onClose, id, isOwner } = props;

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
          toastError(res.message ?? "Get offices detail fail");
          return;
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          setOfficeDetail(res.data.office ?? {});
        }
      })
      .catch((err) => {});
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
          toastError(res.message ?? "Update office fail");
          return;
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          toastSuccess("Update office success");
          dispatch(setIsOffice(!isOffice));
          onClose();
          setIsEditing(false);
        }
      })
      .catch((err) => {});
  };

  const handleDelete = () => {
    DeleteOfficeProxy({ id: id })
      .then((res) => {
        if (res.status === ProxyStatusEnum.FAIL) {
          toastError(res.message ?? "Delete office fail");
          return;
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          toastSuccess("Delete office success");
          dispatch(setIsOffice(!isOffice));
          onClose();
          setIsDeleting(false);
        }
      })
      .catch((err) => {});
  };

  const handleCreateInvitation = (
    values: CreateInvitationFormValuesInterface
  ) => {
    CreateByEmailProxy({ email: values.email, officeId: values.officeId })
      .then((res) => {
        if (res.status === ProxyStatusEnum.FAIL) {
          toastError(res.message ?? "Create invitation fail");
          return;
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          toastSuccess("Create invitation success");
          dispatch(setIsOffice(!isOffice));
          onClose();
          setIsCreate(false);
        }
      })
      .catch((err) => {});
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
          <h1 className="office-detail-form__title">Chi tiết văn phòng</h1>
          <ul className="office-detail-form__items">
            {/* user item - start */}
            <li className="office-detail-form__item">
              <div className="office-detail-form__item-title">Tên:</div>
              <div className="office-detail-form__item-content">
                {officeDetail?.name}
              </div>
            </li>
            {/* user item - end */}
            {/* user item - start */}
            <li className="office-detail-form__item">
              <div className="office-detail-form__item-title">Thành viên:</div>
              <div className="office-detail-form__item-content">
                <ul>
                  {officeDetail?.officeMembers &&
                    officeDetail?.officeMembers.map((member, key) => {
                      return <li key={key}>{member.member.name}</li>;
                    })}
                </ul>
              </div>
            </li>
            {/* user item - end */}
            {/* user item - start */}
            <li className="office-detail-form__item">
              <div className="office-detail-form__item-title">Mã tham gia:</div>
              <div className="office-detail-form__item-content-url">
                {officeDetail ? (
                  <>
                    <div>{officeDetail?.invitationCode}</div>
                    <div>
                      <FaLocationArrow
                        style={{ marginRight: "1rem" }}
                        onClick={() => {
                          setIsCreate(true);
                        }}
                      />
                      <FaLink
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
              <div className="office-detail-form__item-title">Ngày tạo:</div>
              <div className="office-detail-form__item-content">
                {parseStringToDate(officeDetail?.createdAt)}
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
                Chỉnh sửa thông tin
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setIsDeleting(true);
                }}
              >
                Xoá
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );

  return (
    <Popup onClose={onClose}>
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

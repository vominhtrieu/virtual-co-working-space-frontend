import { useEffect, useState } from "react";
import { toastError, toastSuccess } from "../../helpers/toast";
import OfficeDetailProxy from "../../services/proxy/offices/office-detail";
import UpdateOfficeProxy from "../../services/proxy/offices/update-office";
import DeleteOfficeProxy from "../../services/proxy/offices/delete-office";
import { ProxyStatusEnum } from "../../types/http/proxy/ProxyStatus";
import Button from "../UI/button";
import Popup from "../UI/popup";
import EditOfficeForm from "./editOfficeForm";
import {
  EditOfficeDetailFormValuesInterface,
  OfficeDetailFormProps,
  OfficeDetailInterface,
} from "./types";
import DeleteOfficeForm from "./deleteOfficeForm";

const OfficeDetailForm = (props: OfficeDetailFormProps) => {
  const [officeDetail, setOfficeDetail] = useState<OfficeDetailInterface>();
  const { onClose, id } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleEdit = (values: EditOfficeDetailFormValuesInterface) => {
    UpdateOfficeProxy({ id: id, name: values.name })
      .then((res) => {
        if (res.status === ProxyStatusEnum.FAIL) {
          toastError(res.message ?? "Delete office fail");
          return;
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          toastSuccess("Delete office success");
          onClose();
          setIsEditing(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = () =>{
    DeleteOfficeProxy({ id: id})
      .then((res) => {
        if (res.status === ProxyStatusEnum.FAIL) {
          toastError(res.message ?? "Update office fail");
          return;
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          toastSuccess("Update office success");
          onClose();
          setIsDeleting(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const DetailForm = (
    <div className='office-detail-form'>
    <h1 className='office-detail-form__title'>Chi tiết văn phòng</h1>
    <ul className='office-detail-form__items'>
      {/* user item - start */}
      <li className='office-detail-form__item'>
        <div className='office-detail-form__item-title'>Tên:</div>
        <div className='office-detail-form__item-content'>
          {officeDetail?.name}
        </div>
      </li>
      {/* user item - end */}
      {/* user item - start */}
      <li className='office-detail-form__item'>
        <div className='office-detail-form__item-title'>Thành viên:</div>
        <div className='office-detail-form__item-content'>
          <ul>
            {officeDetail?.officeMembers.map((member, key) => {
              return <li key={key}>{member.member.name}</li>;
            })}
          </ul>
        </div>
      </li>
      {/* user item - end */}
      {/* user item - start */}
      <li className='office-detail-form__item'>
        <div className='office-detail-form__item-title'>Mã tham gia:</div>
        <div className='office-detail-form__item-content'>
          {officeDetail?.invitationCode}
        </div>
      </li>
      {/* user item - end */}
      {/* user item - start */}
      <li className='office-detail-form__item'>
        <div className='office-detail-form__item-title'>Ngày tạo:</div>
        <div className='office-detail-form__item-content'>
          {officeDetail?.createdAt}
        </div>
      </li>
      {/* user item - end */}
    </ul>

    <div className='office-detail-form__group-btn'>
      <Button
        variant='primary'
        onClick={() => {
          setIsEditing(true);
        }}
      >
        Chỉnh sửa thông tin
      </Button>
      <Button
        variant='primary'
        onClick={() => {
          setIsDeleting(true);
        }}
      >
        Xoá
      </Button>
    </div>
  </div>
  )

  return (
    <Popup onClose={onClose}>
      {isEditing ? (
        <EditOfficeForm
          onClose={() => {
            setIsEditing(false);
          }}
          onSubmit={handleEdit}
        />
      ) : isDeleting ? (  <DeleteOfficeForm
        onClose={() => {
          setIsDeleting(false);
        }}
        handleDelete={handleDelete}
      />):DetailForm}
    </Popup>
  );
};
export default OfficeDetailForm;

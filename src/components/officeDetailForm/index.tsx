import { useEffect, useState } from "react";
import { toastError, toastSuccess } from "../../helpers/toast";
import OfficeDetailProxy from "../../services/proxy/offices/office-detail";
import UpdateOfficeProxy from "../../services/proxy/offices/update-office";
import { ProxyStatusEnum } from "../../types/http/proxy/ProxyStatus";
import Button from "../UI/button";
import Popup from "../UI/popup";
import EditOfficeForm from "./editOfficeForm";
import {
  EditOfficeDetailFormValuesInterface,
  OfficeDetailFormProps,
  OfficeDetailInterface,
} from "./types";

const OfficeDetailForm = (props: OfficeDetailFormProps) => {
  const [officeDetail, setOfficeDetail] = useState<OfficeDetailInterface>();
  const { onClose, id } = props;

  const [isEditing, setIsEditing] = useState(false);

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
          toastError(res.message ?? "Update office fail");
          return;
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          toastSuccess("Update office success");
          onClose();
          setIsEditing(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Popup onClose={onClose}>
      {isEditing ? (
        <EditOfficeForm
          onClose={() => {
            setIsEditing(false);
          }}
          onSubmit={handleEdit}
        />
      ) : (
        <div className='office-detail'>
          <h1 className='office-detail__title'>Chi tiết văn phòng</h1>
          <ul className='office-detail__items'>
            {/* user item - start */}
            <li className='office-detail__item'>
              <div className='office-detail__item-title'>Tên:</div>
              <div className='office-detail__item-content'>
                {officeDetail?.name}
              </div>
            </li>
            {/* user item - end */}
            {/* user item - start */}
            <li className='office-detail__item'>
              <div className='office-detail__item-title'>Thành viên:</div>
              <div className='office-detail__item-content'>
                <ul>
                  {officeDetail?.officeMembers.map((member) => {
                    return <li>{member.member.name}</li>;
                  })}
                </ul>
              </div>
            </li>
            {/* user item - end */}
            {/* user item - start */}
            <li className='office-detail__item'>
              <div className='office-detail__item-title'>Mã tham gia:</div>
              <div className='office-detail__item-content'>
                {officeDetail?.invitationCode}
              </div>
            </li>
            {/* user item - end */}
            {/* user item - start */}
            <li className='office-detail__item'>
              <div className='office-detail__item-title'>Ngày tạo:</div>
              <div className='office-detail__item-content'>
                {officeDetail?.createdAt}
              </div>
            </li>
            {/* user item - end */}
          </ul>

          <div className='office-detail__group-btn'>
            <Button
              variant='primary'
              onClick={() => {
                setIsEditing(true);
              }}
            >
              Chỉnh sửa thông tin
            </Button>
          </div>
        </div>
      )}
    </Popup>
  );
};
export default OfficeDetailForm;

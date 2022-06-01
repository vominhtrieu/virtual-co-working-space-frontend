import Button from "../../UI/button";
import {
  OfficeDetailFormProps,
} from "./types";
import { useAppSelector } from "../../../stores";
import { loadSelectors } from "../../../stores/load-slice";
import { Spin } from "antd";

const DeleteOfficeForm = (props: OfficeDetailFormProps) => {
  const { onClose, handleDelete } = props;
  const isLoading= useAppSelector(loadSelectors.getIsLoad);

  return (
    <div>
     <p className='delete__title'>Bạn có chắc chắn muốn xoá văn phòng nào không?</p>
      <div className='delete__group-btn'>
        <Button 
        type='submit' 
        onClick={handleDelete}
        disabled={isLoading}
        className="cancel"
        >
          {isLoading ? <Spin style={{ paddingRight: 5 }} /> : null}
         Đồng ý
        </Button>

        <Button type='reset' variant='outlined' onClick={onClose}>
          Huỷ
        </Button>
      </div>
    </div>
  );
};
export default DeleteOfficeForm;

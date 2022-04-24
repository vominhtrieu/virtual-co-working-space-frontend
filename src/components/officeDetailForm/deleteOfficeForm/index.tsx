import Button from "../../UI/button";
import {
  OfficeDetailFormProps,
} from "./types";

const DeleteOfficeForm = (props: OfficeDetailFormProps) => {
  const { onClose, handleDelete } = props;


  return (
    <div>
     <p className='delete__title'>Bạn có chắc chắn muốn xoá văn phòng nào không?</p>
      <div className='delete__group-btn'>
        <Button 
        type='submit' 
        variant='primary'
        onClick={handleDelete}
        >
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

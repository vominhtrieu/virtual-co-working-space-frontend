import { useParams } from "react-router-dom";
import { Col, Row } from "antd";
import IconLanguages from "../../../components/icon-lang";
import { ResetPasswordFormValues} from "./type";
import { ProxyStatusEnum } from "../../../types/http/proxy/ProxyStatus";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../../../helpers/toast";
import ResetProxy from "../../../services/proxy/auth/reset-password";
import ResetForm from "../../../components/password/reset-form";
import forgetImg from "../../../assets/images/forgot/forgot.gif";

function ResetPassword() {
  const params = useParams();
  const {token}: any = params;

  const navigation = useNavigate();

  const handleReset = (values: ResetPasswordFormValues) => {
    console.log(values);
    ResetProxy(token,{
      password: values.password,
      confirmPassword: values.confirmPassword,
    })
      .then((res) => {
        console.log(res);
        if (res.status === ProxyStatusEnum.FAIL) {
          console.log(res.message);
          toastError("reset password fail");
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          console.log(res.data);
          toastSuccess("reset password successfully.");
          navigation('/auth/login');
        }
      })
      .catch((err) => {
        console.log(err);
        // show toast login fail
      })
      .finally(() => {});
  };

  return (
    <section className='reset'>
       <IconLanguages />
       <Row justify='space-around'>
       <Col span={8}>
        <div className='reset__img'>
           <img src={forgetImg} alt='ViWorkSpaceResetImage' />
         </div>
       </Col>
       <Col span={8}>
          <div className='reset__form'>
            <ResetForm handleResetSubmit={handleReset}/>
          </div>
        </Col>
     </Row>
    </section>
  );
}

export default ResetPassword;

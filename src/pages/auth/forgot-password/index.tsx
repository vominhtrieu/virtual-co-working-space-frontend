import { Col, Row } from "antd";
import IconLanguages from "../../../components/icon-lang";
import { ForgotPasswordFormValues } from "./type";
import { ProxyStatusEnum } from "../../../types/http/proxy/ProxyStatus";
import { toastError, toastSuccess } from "../../../helpers/toast";
import ForgotForm from "../../../components/password/forgot-form";
import ForgotProxy from "../../../services/proxy/auth/forgot-password";
import forgetImg from "../../../assets/images/forgot/forgot.gif";

function ForgotPassword() {

  const handleForgot = (values: ForgotPasswordFormValues) => {
    ForgotProxy({
      email: values.email,
    })
      .then((res) => {
        if (res.status === ProxyStatusEnum.FAIL) {
          toastError("Forgot password fail");
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          toastSuccess("Forgot password successfully. Please check mail to change password.");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => { });
  };

  return (
    <section className='forgot'>
        <div className="icon-lang">
        <IconLanguages />
        </div>
      <Row justify='space-around'>
        <Col span={8}>
          <div className='forgot__img'>
            <img src={forgetImg} alt='ViWorkSpaceResetImage' />
          </div>
        </Col>
        <Col span={8}>
          <div className='forgot__form'>
            <ForgotForm handleForgotSubmit={handleForgot} />
          </div>
        </Col>
      </Row>
    </section>
  );
}

export default ForgotPassword;

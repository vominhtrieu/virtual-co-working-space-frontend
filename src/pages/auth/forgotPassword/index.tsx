import { Col, Row } from "antd";
import IconLanguages from "../../../components/icon-lang";
import { ForgotPasswordFormValues } from "./type";
import { ProxyStatusEnum } from "../../../types/http/proxy/ProxyStatus";
import { toastError, toastSuccess } from "../../../helpers/toast";
import ForgotForm from "../../../components/password/forgotForm";
import ForgotProxy from "../../../services/proxy/auth/forgotPassword";

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
      .finally(() => {});
  };

  return (
    <section className='forgot'>
       <IconLanguages />
      <Row justify='space-around'>
        <Col span={10} offset={2}>
          <div className='forgot__form'>
            <ForgotForm handleForgotSubmit={handleForgot} />
          </div>
        </Col>
      </Row>
    </section>
  );
}

export default ForgotPassword;

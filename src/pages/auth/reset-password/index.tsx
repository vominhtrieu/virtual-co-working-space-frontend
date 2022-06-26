import { useParams } from "react-router-dom";
import { Col, Row } from "antd";
import IconLanguages from "../../../components/icon-lang";
import { ResetPasswordFormValues } from "./type";
import { ProxyStatusEnum } from "../../../types/http/proxy/ProxyStatus";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../../../helpers/toast";
import ResetProxy from "../../../services/proxy/auth/reset-password";
import ResetForm from "../../../components/password/reset-form";
import forgetImg from "../../../assets/images/forgot/forgot.gif";
import { useTranslation } from "react-i18next";

function ResetPassword() {
  const params = useParams();
  const { token }: any = params;
  const { t } = useTranslation();

  const navigation = useNavigate();

  const handleReset = (values: ResetPasswordFormValues) => {
    ResetProxy(token, {
      password: values.password,
      confirmPassword: values.confirmPassword,
    })
      .then((res) => {
        if (res.status === ProxyStatusEnum.FAIL) {
          console.log(t(`error.${res.message}`));
          toastError("reset password fail");
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          toastSuccess("reset password successfully.");
          navigation("/auth/login");
        }
      })
      .catch((err) => {
        console.log(err);
        // show toast login fail
      })
      .finally(() => {});
  };

  return (
    <section className="reset">
      <div className="icon-lang">
        <IconLanguages />
      </div>
      <Row justify="space-around">
        <Col span={8}>
          <div className="reset__img">
            <img src={forgetImg} alt="ViWorkSpaceResetImage" />
          </div>
        </Col>
        <Col span={8}>
          <div className="reset__form">
            <ResetForm handleResetSubmit={handleReset} />
          </div>
        </Col>
      </Row>
    </section>
  );
}

export default ResetPassword;

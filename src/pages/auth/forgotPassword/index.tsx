import { Col, Row } from "antd";
import registerImage from "../../../assets/images/register/register-img.svg";
import IconLanguages from "../../../components/icon-lang";
// import { resetPasswordFormValues} from "./type";
import RegisterForm from "../../../components/register/registerForm";
import RegisterProxy from "../../../services/proxy/auth/register";
import { ProxyStatusEnum } from "../../../types/http/proxy/ProxyStatus";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../../../helpers/toast";
// import resetForm from "../../../components/active/resetPassword";

function resetPassword() {
  // const navigation = useNavigate();

  // const handlereset = (values: resetPasswordFormValues) => {
  //   resetProxy({
  //     password: values.password,
  //     passwordConfirm: values.passwordConfirm
  //   })
  //     .then((res) => {
  //       console.log(res);
  //       if (res.status === ProxyStatusEnum.FAIL) {
  //         console.log(res.message);
  //         toastError("resetpassword fail");
  //       }

  //       if (res.status === ProxyStatusEnum.SUCCESS) {
  //         console.log(res.data);
  //         toastSuccess("reset password successfully.");
  //         navigation('/auth/login');
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       // show toast login fail
  //     })
  //     .finally(() => {});
  // };

  return (
    <section className='reset'>
       <IconLanguages />
      <Row justify='space-around'>
        <Col span={6} offset={5}>
          <div className='reset__form'>
            {/* <resetForm handleresetSubmit={handlereset} /> */}
          </div>
        </Col>
      </Row>
    </section>
  );
}

export default resetPassword;

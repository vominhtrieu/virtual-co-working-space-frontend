import { Col, Row } from "antd";
import registerImage from "../../../assets/images/register/register-img.svg";
import IconLanguages from "../../../components/icon-lang";
import { RegisterFormValues} from "./type";
import RegisterForm from "../../../components/register/registerForm";
import RegisterProxy from "../../../services/proxy/auth/register";
import { ProxyStatusEnum } from "../../../types/http/proxy/ProxyStatus";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../../../helpers/toast";

function Register() {
  const navigate = useNavigate();

  const handleRegister = (values: RegisterFormValues) => {
    RegisterProxy({
      name: values.name,
      email: values.email,
      password: values.password,
      passwordConfirm: values.passwordConfirm
    })
      .then((res) => {
        if (res.status === ProxyStatusEnum.FAIL) {
          console.log(res);
          console.log(res.message);
          toastError(res.message ?? "Register fail");
          return;
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          toastSuccess("register success");
          navigate("/auth/login");
          return;
        }
      })
      .catch((err) => {
        console.log(err);
        // show toast login fail
      })
      .finally(() => {});
  };

  return (
    <section className='register'>
       <IconLanguages />
      <Row justify='space-around'>
        <Col span={6}>
          <div className='register__form'>
            <RegisterForm handleRegisterSubmit={handleRegister} />
          </div>
        </Col>
        <Col span={10}>
          <div className='register__img'>
            <img src={registerImage} alt='ViWorkSpaceloginImage' />
          </div>
        </Col>
      </Row>
    </section>
  );
}

export default Register;
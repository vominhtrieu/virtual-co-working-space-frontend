import { useState } from "react";
import { Col, Row } from "antd";
import registerImage from "../../../assets/images/register/register.gif";
import IconLanguages from "../../../components/icon-lang";
import { RegisterFormValues} from "./type";
import RegisterForm from "../../../components/register/registerForm";
import RegisterProxy from "../../../services/proxy/auth/register";
import { ProxyStatusEnum } from "../../../types/http/proxy/ProxyStatus";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../../../helpers/toast";
import { Spin } from 'antd'

function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRegister = (values: RegisterFormValues) => {
    setIsLoading(true);
    RegisterProxy({
      name: values.name,
      email: values.email,
      password: values.password,
      passwordConfirm: values.passwordConfirm
    })
      .then((res) => {
        if (res.status === ProxyStatusEnum.FAIL) {
          toastError(res.message ?? "Register fail");
          setIsLoading(false);
          return;
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          setIsLoading(true);
          toastSuccess("register success");
          navigate("/auth/login");
          return;
        }
      })
      .catch((err) => {
        setIsLoading(false);
      })
      .finally(() => {});
  };


  const FormRegister = () => {
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

  return (
    <>
      {isLoading ?
      <Spin> 
        <FormRegister/>
      </Spin> :<FormRegister/>
      }
    </>
  );
}

export default Register;

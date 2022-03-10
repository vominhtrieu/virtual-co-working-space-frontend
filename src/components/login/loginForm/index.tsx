import { useForm } from "react-hook-form";
import { RiFacebookFill, RiGithubFill, RiGoogleFill, RiLinkedinFill, RiTwitterLine } from "react-icons/ri";
import { FaEnvelope, FaKey } from "react-icons/fa";
import { FormPropsInterface, InputInterface } from "./types";
import InputText from "../../UI/form-controls/inputText";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const LoginForm = ({ handleLoginSubmit }: FormPropsInterface) => {
  const schema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
  });

  const { control, handleSubmit } = useForm<InputInterface>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const onLoginSubmit = (values: InputInterface) => {
    const formValues = {
      email: values["email"],
      password: values["password"],
    };

    handleLoginSubmit(formValues);
  };

  return (
    <form className='login-form' onSubmit={handleSubmit(onLoginSubmit)}>
      <h1 className='login-form__title'>Login</h1>
      <div className='login-form__input-block'>
        <InputText hasLabel name='email' control={control} prefix={<FaEnvelope />} size='large' placeholder='Email' />
      </div>

      <div className='login-form__input-block'>
        <InputText
          hasLabel
          type='password'
          name='password'
          control={control}
          prefix={<FaKey />}
          size='large'
          placeholder='Password'
        />
      </div>

      <div className='login-form__forgot-pass'>
        <Link to={"#"}>Forgot password?</Link>
      </div>

      <button type='submit' className='login-form__btn'>
        Log In
      </button>

      <div className='login-form__not-member'>
        Not a member?
        <Link to={"#"}>
          <span>Register now.</span>
        </Link>
      </div>

      <div className='login-form__or'>or</div>

      <div className='login-form__social'>
        <div className='login-form__social-item'>
          <RiFacebookFill />
        </div>
        <div className='login-form__social-item'>
          <RiGithubFill />
        </div>
        <div className='login-form__social-item'>
          <RiGoogleFill />
        </div>
        <div className='login-form__social-item'>
          <RiLinkedinFill />
        </div>
        <div className='login-form__social-item'>
          <RiTwitterLine />
        </div>
      </div>
    </form>
  );
};

export default LoginForm;

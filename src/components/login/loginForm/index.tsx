import { useForm } from "react-hook-form";
import { RiFacebookFill, RiGithubFill, RiGoogleFill, RiLinkedinFill, RiTwitterLine } from "react-icons/ri";
import { FaEnvelope, FaKey } from "react-icons/fa";
import { FormPropsInterface, InputInterface } from "./types";
import InputText from "../../UI/form-controls/inputText";
import { Link } from "react-router-dom";

const LoginForm = ({ handleLoginSubmit }: FormPropsInterface) => {
  const { control, handleSubmit } = useForm<InputInterface>({
    defaultValues: {
      email: "",
      password: "",
    },
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

import { useForm } from "react-hook-form";
import { RiFacebookFill, RiGithubFill, RiGoogleFill, RiLinkedinFill, RiTwitterLine } from "react-icons/ri";
import { FaEnvelope, FaKey } from "react-icons/fa";
import { FormPropsInterface, InputInterface } from "./types";
import InputText from "../../form-controls/inputText";

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
    <form onSubmit={handleSubmit(onLoginSubmit)}>
      <h1 style={{ color: "white", textAlign: "left", fontSize: "30px" }}>Login</h1>

      <InputText hasLabel name='email' control={control} prefix={<FaEnvelope />} size='large' placeholder='Email' />

      <InputText
        hasLabel
        type='password'
        name='password'
        control={control}
        prefix={<FaKey />}
        size='large'
        placeholder='Password'
      />

      <div className='input-text'>
        <a style={{ textAlign: "left" }}>Forgot password?</a>
      </div>

      <button type='submit' className='btn-login'>
        Log In
      </button>

      <div className='input-text'>
        <a>
          Not a member? <b>Register now.</b>{" "}
        </a>
      </div>

      <div className='bar'>
        <div className='left-bar'></div>
        <span className='text-bar'>or</span>
        <div className='right-bar'></div>
      </div>

      <div className='social'>
        <div className='fb'>
          <RiFacebookFill />
        </div>
        <div className='git'>
          <RiGithubFill />
        </div>
        <div className='gg'>
          <RiGoogleFill />
        </div>
        <div className='in'>
          <RiLinkedinFill />
        </div>
        <div className='twitter'>
          <RiTwitterLine />
        </div>
      </div>
    </form>
  );
};

export default LoginForm;

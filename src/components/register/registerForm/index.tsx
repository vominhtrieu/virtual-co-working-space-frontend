import { useForm } from "react-hook-form";
import { FaEnvelope, FaKey, FaUser } from "react-icons/fa";
// import { FormPropsInterface, InputInterface } from "./types";
import { FormPropsInterface, InputInterface } from "./types";
import InputText from "../../UI/form-controls/inputText";
import { Link } from "react-router-dom";

const RegisterForm = ({ handleRegisterSubmit }: FormPropsInterface) => {
  const { control, handleSubmit } = useForm<InputInterface>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onRegisterSubmit = (values: InputInterface) => {
    const formValues = {
      name: values["name"],
      email: values["email"],
      password: values["password"],
      confirmPassword: values["confirmPassword"],
    };

    handleRegisterSubmit(formValues);
  };

  return (
    <form className='register-form' onSubmit={handleSubmit(onRegisterSubmit)}>
      <h1 className='register-form__title'>Register</h1>

      <div className='register-form__input-block'>
        <InputText
          hasLabel
          name='name'
          control={control}
          prefix={<FaUser />}
          size='large'
          placeholder='Name'
        />
      </div>

      <div className='register-form__input-block'>
        <InputText
          hasLabel
          name='email'
          control={control}
          prefix={<FaEnvelope />}
          size='large'
          placeholder='Email'
        />
      </div>

      <div className='register-form__input-block'>
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

      <div className='register-form__input-block'>
        <InputText
          hasLabel
          type='password'
          name='confirmPassword'
          control={control}
          prefix={<FaKey />}
          size='large'
          placeholder='Confirm Password'
        />
      </div>

      <button type='submit' className='register-form__btn'>
        Register
      </button>

      <div className='register-form__an-account'>
        Already have an account?
        <Link to='/auth/login'>
          <span>Login.</span>
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;

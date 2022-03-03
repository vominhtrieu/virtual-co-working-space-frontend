import { useForm } from "react-hook-form";
import InputText from "../../form-controls/inputText";

const LoginForm = () => {
  const { control } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLoginSubmit = (values: any) => {
    console.log("Login values: ", values);
  };

  return (
    <form onSubmit={handleLoginSubmit}>
      <InputText name='email' control={control} size='large' />
      <InputText name='password' control={control} size='large' />
    </form>
  );
};

export default LoginForm;

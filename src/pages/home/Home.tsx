import { useTranslation } from "react-i18next";
import LoginForm from "../../components/UI/form/loginForm";

const Home = () => {
  const { t } = useTranslation();

  return (
    <section>
      <LoginForm />
    </section>
  );
};

export default Home;

import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();

  return <div className='home'>{t("home.title")}</div>;
};

export default Home;

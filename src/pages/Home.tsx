import { useTranslation } from "react-i18next";
import Languages from "../components/UI/languages";

const Home = () => {
  const { t } = useTranslation();

  return <div>{t("home.title")}</div>;
};

export default Home;

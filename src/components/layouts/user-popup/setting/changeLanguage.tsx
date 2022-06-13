import { Radio, RadioChangeEvent } from "antd";
import i18n from "i18next";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getDataLocal, saveDataLocal } from "../../../../helpers/localStorage";

const ChangeLanguage = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState("vi");

  useEffect(() => {
    const language = getDataLocal("language");
    if (language) {
      setValue(language);
    }
  }, []);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
    i18n.changeLanguage(e.target.value);
    saveDataLocal("language", e.target.value);
  };

  return (
    <Radio.Group onChange={onChange} value={value}>
      <Radio value={"vi"}>
        <span className="text-white">{t("default.language.vi")}</span>
      </Radio>
      <Radio value={"en"}>
        <span className="text-white">{t("default.language.en")}</span>
      </Radio>
    </Radio.Group>
  );
};

export default ChangeLanguage;

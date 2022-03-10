import i18n from "i18next";
import { Dropdown, Menu } from "antd";
import { BsTranslate } from "react-icons/bs";
import { useTranslation } from "react-i18next";

const IconLanguages = () => {
  const { t } = useTranslation();
  const menu = (
    <Menu>
      <Menu.Item key='vi'>
        <p
          className='lang__item'
          onClick={() => {
            i18n.changeLanguage("vi");
          }}
        >
          {t("default.language.vi")}
        </p>
      </Menu.Item>
      <Menu.Item key='en'>
        <p
          className='lang__item'
          onClick={() => {
            i18n.changeLanguage("en");
          }}
        >
          {t("default.language.en")}
        </p>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className='lang'>
      <Dropdown overlay={menu} placement='bottomRight'>
        <BsTranslate />
      </Dropdown>
    </div>
  );
};

export default IconLanguages;

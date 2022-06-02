import { Dropdown, Menu } from "antd";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { IoMdArrowDropdown } from "react-icons/io";

const ChangeLanguage = () => {
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
    <Dropdown overlay={menu}>
      <div className='sidebar-settings__change-lang'>
        Chọn ngôn ngữ <IoMdArrowDropdown />
      </div>
    </Dropdown>
  );
};

export default ChangeLanguage;
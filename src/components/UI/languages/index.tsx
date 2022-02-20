import i18n from "i18next";
import { Dropdown, Menu } from "antd";
import { useState } from "react";
import Button from "../../Button";

const Languages = () => {
  const [language, setLanguage] = useState("vi");

  const menu = (
    <Menu>
      <Menu.Item>
        <p
          onClick={() => {
            i18n.changeLanguage("vi");
            setLanguage("vi");
            console.log("vi");
          }}
        >
          Tiếng việt
        </p>
      </Menu.Item>
      <Menu.Item>
        <p
          onClick={() => {
            i18n.changeLanguage("en");
            setLanguage("en");
            console.log("en");
          }}
        >
          Tiếng anh
        </p>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className='cws-lang'>
      <Dropdown overlay={menu} placement='bottomRight'>
        <Button>{language}</Button>
      </Dropdown>
    </div>
  );
};

export default Languages;

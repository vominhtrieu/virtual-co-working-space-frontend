import { Slider } from "antd";
import SidebarBox from "../sidebarBox";
import ChangeLanguage from "./changeLanguage/changeLanguage";

const SidebarSettings = () => {
  const handleChangeVolume = (e) => {
    console.log("Âm lượng: ", e);
  };

  return (
    <SidebarBox>
      <div className='sidebar-settings'>
        <div className='sidebar-settings__title'>Settings</div>
        {/* block - start */}
        <div className='sidebar-settings__block'>
          <div className='sidebar-settings__block-title'>Âm lượng</div>
          <div className='sidebar-settings__block-content'>
            <Slider defaultValue={30} onChange={handleChangeVolume} />
          </div>
        </div>
        {/* block - end */}
        {/* block - start */}
        <div className='sidebar-settings__block'>
          <div className='sidebar-settings__block-title'>Ngôn ngữ</div>
          <div className='sidebar-settings__block-content'>
            <ChangeLanguage />
          </div>
        </div>
        {/* block - end */}
      </div>
    </SidebarBox>
  );
};

export default SidebarSettings;

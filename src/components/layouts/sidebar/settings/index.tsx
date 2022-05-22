import { Slider } from "antd";
import SidebarBox from "../sidebar-box";
import ChangeLanguage from "./changeLanguage/changeLanguage";
import { useAppDispatch,useAppSelector } from "../../../../stores";
import { setVolume} from "../../../../stores/volume-slice";
import { volumeSelectors } from "../../../../stores/volume-slice";
import { saveDataLocal } from "../../../../helpers/localStorage";
import { getDataLocal } from "../../../../helpers/localStorage";
import { useEffect } from "react";


const SidebarSettings = () => {
  const volume = useAppSelector(volumeSelectors.getVolume);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(setVolume(Number.parseInt(getDataLocal("volume")??100)));
  }, [])

  const handleChangeVolume = (e) => {
    saveDataLocal("volume",e);
    dispatch(setVolume(Number.parseInt(e)));
  };

  return (
    <SidebarBox>
      <div className='sidebar-settings'>
        <div className='sidebar-settings__title'>Settings</div>
        {/* block - start */}
        <div className='sidebar-settings__block'>
          <div className='sidebar-settings__block-title'>Âm lượng</div>
          <div className='sidebar-settings__block-content'>
            <Slider defaultValue={getDataLocal("volume")??100} onChange={handleChangeVolume} value={volume} />
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

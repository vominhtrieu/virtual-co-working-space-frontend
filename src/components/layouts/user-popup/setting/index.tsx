import { Slider } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getDataLocal, saveDataLocal } from "../../../../helpers/localStorage";
import { useAppDispatch, useAppSelector } from "../../../../stores";
import { setVolume, volumeSelectors } from "../../../../stores/volume-slice";
import ChangeLanguage from "./changeLanguage";
import Popup from "../../../UI/popup";
import { OfficeSettingProps } from "./types";

const Setting = (props: OfficeSettingProps) => {
  const { onClose } = props;
  const volume = useAppSelector(volumeSelectors.getVolume);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(setVolume(Number.parseInt(getDataLocal("volume") ?? 100)));
  }, [dispatch]);

  const handleChangeVolume = (e) => {
    saveDataLocal("volume", e);
    dispatch(setVolume(Number.parseInt(e)));
  };
  return (
    <Popup title={t("pages.office.setting.title")} onClose={onClose} type="dark">
      {/* block - start */}
      <div className="sidebar-settings__block">
        <div className="sidebar-settings__block-title">
          {t("pages.office.setting.volume")}
        </div>
        <div className="sidebar-settings__block-content">
          <Slider
            defaultValue={getDataLocal("volume") ?? 100}
            onChange={handleChangeVolume}
            value={volume}
          />
        </div>
      </div>
      {/* block - end */}
      {/* block - start */}
      <div className="sidebar-settings__block">
        <div className="sidebar-settings__block-title">
          {t("pages.office.setting.language")}
        </div>
        <div className="sidebar-settings__block-content">
          <ChangeLanguage />
        </div>
      </div>
      {/* block - end */}
    </Popup>
  );
};

export default Setting;

import { Slider } from 'antd'
import { useEffect } from 'react'
import { getDataLocal, saveDataLocal } from '../../../helpers/localStorage'
import { useAppDispatch, useAppSelector } from '../../../stores'
import { setVolume, volumeSelectors } from '../../../stores/volume-slice'
import OfficePopup from '../../UI/office-popup'
import ChangeLanguage from './changeLanguage'
import { OfficeSettingProps } from './types'

const OfficeSetting = (props: OfficeSettingProps) => {
  const { onClose } = props
  const volume = useAppSelector(volumeSelectors.getVolume)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setVolume(Number.parseInt(getDataLocal('volume') ?? 100)))
  }, [dispatch])

  const handleChangeVolume = (e) => {
    saveDataLocal('volume', e)
    dispatch(setVolume(Number.parseInt(e)))
  }
  return (
    <OfficePopup title="Cài đặt" onClose={onClose}>
      {/* block - start */}
      <div className="sidebar-settings__block">
        <div className="sidebar-settings__block-title">Âm lượng</div>
        <div className="sidebar-settings__block-content">
          <Slider
            defaultValue={getDataLocal('volume') ?? 100}
            onChange={handleChangeVolume}
            value={volume}
          />
        </div>
      </div>
      {/* block - end */}
      {/* block - start */}
      <div className="sidebar-settings__block">
        <div className="sidebar-settings__block-title">Ngôn ngữ</div>
        <div className="sidebar-settings__block-content">
          <ChangeLanguage />
        </div>
      </div>
      {/* block - end */}
    </OfficePopup>
  )
}

export default OfficeSetting

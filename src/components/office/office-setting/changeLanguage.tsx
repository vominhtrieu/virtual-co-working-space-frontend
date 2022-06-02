import { Dropdown, Menu, Radio, RadioChangeEvent } from 'antd'
import i18n from 'i18next'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IoMdArrowDropdown } from 'react-icons/io'

const ChangeLanguage = () => {
  const { t } = useTranslation()
  const [value, setValue] = useState('vi')

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value)
    setValue(e.target.value)
    i18n.changeLanguage(e.target.value)
  }

  return (
    <Radio.Group onChange={onChange} value={value}>
      <Radio value={'vi'}>
        <span className="text-white">{t('default.language.vi')}</span>
      </Radio>
      <Radio value={'en'}>
        <span className="text-white">{t('default.language.en')}</span>
      </Radio>
    </Radio.Group>
  )
}

export default ChangeLanguage

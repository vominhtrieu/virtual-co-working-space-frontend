import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import InputWhite from '../../../components/UI/form-controls/input-white'
import Popup from '../../../components/UI/popup'
import { useAppSelector } from '../../../stores'
import { userSelectors } from '../../../stores/auth-slice'
import ProfileAvatar from './avatar'
import {
  EditProfileFormDataInterface,
  EditProfileFormProps,
  EditProfileInputInterface,
} from './types'

const EditProfileForm = (props: EditProfileFormProps) => {
  const { t } = useTranslation()

  const { onClose, onSubmit } = props

  const userInfo = useAppSelector(userSelectors.getUserInfo)

  const [isAvatar, setIsAvatar] = useState<string>(userInfo.avatar)

  const schema = yup.object().shape({
    name: yup
      .string()
      .required(
        t('default.error.required', { field: t('pages.register.name') }),
      )
      .min(
        6,
        t('default.error.minLength', {
          field: t('pages.register.name'),
          min: 6,
        }),
      )
      .max(
        50,
        t('default.error.maxLength', {
          field: t('pages.register.name'),
          max: 50,
        }),
      ),
    phone: yup
      .string()
      .required(t('default.error.required', { field: 'phone' }))
      .matches(
        /(((\+)84)|0)(3|5|7|8|9)+([0-9]{8})\b/,
        t('default.error.phone', { field: 'phone' }),
      ),
  })

  const { control, handleSubmit } = useForm<EditProfileInputInterface>({
    defaultValues: {
      name: userInfo.name ?? '',
      phone: userInfo.phone ?? '',
      avatar: userInfo.avatar ?? '',
    },
    resolver: yupResolver(schema),
  })

  const formatPhoneNumber = (phone) => {
    phone = phone.trim()
    if (phone[0] === '0') {
      return '+84' + phone.slice(1, 10)
    }
    return phone
  }

  const handleEditProfileSubmit = (data: EditProfileInputInterface) => {
    const formatData: EditProfileFormDataInterface = {
      name: data.name,
      phone: formatPhoneNumber(data.phone),
      avatar: isAvatar,
    }
    onSubmit(formatData)
  }

  return (
    <Popup
      onClose={onClose}
      title="Change Profile"
      type="white"
      onSubmit={handleSubmit(handleEditProfileSubmit)}
      hasFooter={true}
    >
      <form>
        <ul className="edit-profile__items">
          {/* user item - start */}
          <li className="edit-profile__item-avatar">
            <ProfileAvatar
              size={120}
              setIsAvatar={setIsAvatar}
              isAvatar={isAvatar}
            />
          </li>
          {/* user item - end */}
          <div className="change-pass-form__input-block">
            <InputWhite
              control={control}
              type="text"
              name="name"
              label="Name"
              hasLabel
              placeholder="Enter name..."
            />
          </div>

          <div className="change-pass-form__input-block">
            <InputWhite
              control={control}
              type="text"
              name="phone"
              label="Phone Number"
              hasLabel
              placeholder="Enter phone number..."
            />
          </div>
        </ul>
      </form>
    </Popup>
  )
}
export default EditProfileForm

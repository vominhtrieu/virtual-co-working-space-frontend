import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import InputWhite from '../../../UI/form-controls/input-white'
import Popup from '../../../UI/popup'
import {
  JoinOfficeFormDataInterface,
  JoinOfficeFormInputInterface,
  JoinOfficeFormProps,
} from './types'
import { useAppSelector } from '../../../../stores'
import { loadSelectors } from '../../../../stores/load-slice'
import { Spin } from 'antd'

const JoinOfficeForm = (props: JoinOfficeFormProps) => {
  const { onClose, onSubmit } = props

  const isLoading = useAppSelector(loadSelectors.getIsLoad)

  const schema = yup.object().shape({
    code: yup
      .string()
      .required('Code is required')
      .matches(/^[A-Za-z0-9]*$/, 'Code only contain character and number')
      .test('len', 'Code must be 6 character', (val) => val?.length === 6),
  })

  const { control, handleSubmit } = useForm<JoinOfficeFormInputInterface>({
    defaultValues: {
      code: '',
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  const handleJoinOfficeSubmit = (data: JoinOfficeFormInputInterface) => {
    const formatData: JoinOfficeFormDataInterface = {
      id: data.code,
    }
    onSubmit(formatData)
    onClose()
  }
  return (
    <Popup
      onClose={onClose}
      title="Join Office"
      type="white"
      onSubmit={handleSubmit(handleJoinOfficeSubmit)}
      hasFooter
    >
      <form>
        <div className="join-office-form__input-block">
          <InputWhite
            control={control}
            name="code"
            hasLabel
            label="Code"
            placeholder="Enter the code..."
          />
        </div>
      </form>
    </Popup>
  )
}

export default JoinOfficeForm

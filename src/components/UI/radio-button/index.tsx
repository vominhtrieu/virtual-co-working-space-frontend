import { Radio } from 'antd'
import { RadioButtonProps } from './types'

const RadioButton = (props: RadioButtonProps) => {
  const { listCategory, onClick } = props

  return (
    <Radio.Group defaultValue={listCategory[0]} buttonStyle="solid">
      {listCategory.map((item) => {
        return (
          <Radio.Button
            value={item.id}
            key={item.id}
            onClick={() => onClick(item.id)}
            className="radio-btn__item"
          >
            {item.name}
          </Radio.Button>
        )
      })}
    </Radio.Group>
  )
}

export default RadioButton

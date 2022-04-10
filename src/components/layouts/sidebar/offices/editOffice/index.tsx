import { Dropdown, Menu } from 'antd'
import { useState } from 'react'
import { IoMdArrowDropdown } from 'react-icons/io'
import Button from '../../../../UI/button'
import { EditOfficePropsInterface } from './types'

const EditOffice = (props: EditOfficePropsInterface) => {
  const [itemGroupSelected, setItemGroupSelected] = useState(0)
  const { itemGroups, onItemClick } = props

  const menu = (
    <Menu>
      {itemGroups.map((item, index) => {
        return (
          <Menu.Item
            key={index}
            onClick={() => setItemGroupSelected(index)}
            className="edit-office__item"
          >
            {item.groupName}
          </Menu.Item>
        )
      })}
    </Menu>
  )

  return (
    <div className="edit-office">
      <h1 className="edit-office__title">Edit office</h1>
      <div className="edit-office__container">
        <Dropdown overlay={menu}>
          <div className="edit-office__select-items">
          {itemGroups[itemGroupSelected].groupName} <IoMdArrowDropdown />
          </div>
        </Dropdown>
        <div className="edit-office__item-list">
          {itemGroups[itemGroupSelected].items &&
            itemGroups[itemGroupSelected].items.map((item: any) => {
              return (
                <Button
                  className="edit-office__btn-select"
                  onClick={() => {
                    onItemClick(item)
                  }}
                >
                  <img
                    alt="models"
                    src={item.url}
                    className="edit-office__item-img"
                  />
                </Button>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default EditOffice

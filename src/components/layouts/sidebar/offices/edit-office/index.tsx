import { Dropdown, Menu } from 'antd'
import { useState } from 'react'
import { IoMdArrowDropdown } from 'react-icons/io'
import { ItemCategory } from '../../../../../services/api/offices/get-office-categories/types'
import Button from '../../../../UI/button'
import OfficePopup from '../../../../UI/office-popup'
import { EditOfficePropsInterface } from './types'

const EditOffice = (props: EditOfficePropsInterface) => {
  const { onClose, onItemClick } = props
  const [itemCategories, setItemCategories] = useState<any[]>([])
  const [items, setItems] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory | null>(
    null,
  )

  //   useEffect(() => {
  //     getItemCategories().then((data: any) => {
  //       if (data) {
  //         setItemCategories(data.data.itemCategories)
  //         setSelectedCategory(data.data.itemCategories[0])
  //       }
  //     })
  //   }, [])

  //   useEffect(() => {
  //     if (selectedCategory)
  //       getItems(selectedCategory.id).then((data: any) => {
  //         setItems(data.data.items)
  //       })
  //   }, [selectedCategory])

  const menu =
    itemCategories.length > 0 ? (
      <Menu>
        {itemCategories.map((item) => {
          return (
            <Menu.Item
              key={item.id}
              onClick={() => setSelectedCategory(item)}
              className="edit-office__item"
            >
              {item.name}
            </Menu.Item>
          )
        })}
      </Menu>
    ) : null

  return (
    <OfficePopup title="Edit Office" onClose={onClose}>
      <div className="edit-office__container">
        {menu && selectedCategory && (
          <Dropdown overlay={menu}>
            <div className="edit-office__select-items">
              {selectedCategory.name} <IoMdArrowDropdown />
            </div>
          </Dropdown>
        )}
        <div className="edit-office__item-list">
          {items.map((item: any) => {
            return (
              <Button
                className="edit-office__btn-select"
                key={item.id}
                onClick={() => {
                  //   onItemClick(item)
                }}
              >
                <img
                  alt="models"
                  src={item.image}
                  className="edit-office__item-img"
                />
              </Button>
            )
          })}
        </div>
      </div>
    </OfficePopup>
  )
}

export default EditOffice
// <div className="edit-office">

// </div>

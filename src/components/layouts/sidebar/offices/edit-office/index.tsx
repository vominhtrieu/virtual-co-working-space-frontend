import { useEffect, useState } from 'react'
import { getItemCategories } from '../../../../../services/api/offices/get-office-categories'
import { ItemCategory } from '../../../../../services/api/offices/get-office-categories/types'
import { getItems } from '../../../../../services/api/offices/get-office-item'
import Button from '../../../../UI/button'
import OfficePopup from '../../../../UI/office-popup'
import RadioButton from '../../../../UI/radio-button'
import { EditOfficePropsInterface } from './types'

const EditOffice = (props: EditOfficePropsInterface) => {
  const { onClose, onItemClick } = props
  const [itemCategories, setItemCategories] = useState<any[]>([])
  const [items, setItems] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory | null>(
    null,
  )

  useEffect(() => {
    getItemCategories().then((data: any) => {
      if (data) {
        setItemCategories(data.data.itemCategories)
        setSelectedCategory(data.data.itemCategories[0])
      }
    })
  }, [])

  useEffect(() => {
    if (selectedCategory)
      getItems(selectedCategory.id).then((data: any) => {
        setItems(data.data.items)
      })
  }, [selectedCategory])

  const onCategoryClick = (itemId: number) => {
    //find item
    const item = itemCategories.find((item) => item.id === itemId)

    if (item) {
      setSelectedCategory(item)
    }
  }

  return (
    <OfficePopup title="Edit Office" onClose={onClose}>
      <div className="edit-office__container">
        <RadioButton listCategory={itemCategories} onClick={onCategoryClick} />
        <div className="edit-office__item-list">
          {items.map((item: any) => {
            return (
              <Button
                className="edit-office__btn-select"
                key={item.id}
                onClick={() => {
                  onItemClick(item)
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

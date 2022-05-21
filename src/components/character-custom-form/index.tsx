import {Dropdown, Menu} from 'antd'
import {useState} from 'react'
import {IoMdArrowDropdown} from 'react-icons/io'
import Button from '../UI/button'
import {CharacterCustomFormInterface} from './types'

const CharacterCustomForm = (props: CharacterCustomFormInterface) => {
    const [itemGroupSelected, setItemGroupSelected] = useState(0)
    const {itemGroups, onItemClick} = props

    const menu = (
        <Menu>
            {itemGroups.map((item, index) => {
                return (
                    <Menu.Item
                        key={index}
                        onClick={() => setItemGroupSelected(index)}
                        className="character-custom__item"
                    >
                        {item.groupName}
                    </Menu.Item>
                )
            })}
        </Menu>
    )

    return (
        <div className="character-custom">
            <h1 className="character-custom__title">Edit office</h1>
            <div className="character-custom__container">
                <Dropdown overlay={menu}>
                    <div className="character-custom__select-items">
                        {itemGroups[itemGroupSelected].groupName} <IoMdArrowDropdown/>
                    </div>
                </Dropdown>
                <div className="character-custom__item-list">
                    {itemGroups[itemGroupSelected].items &&
                        itemGroups[itemGroupSelected].items.map((item: any, idx: number) => {
                            return (
                                <Button
                                    className="character-custom__btn-select"
                                    onClick={() => {
                                        onItemClick(itemGroupSelected, idx)
                                    }}
                                >
                                    <img
                                        alt="models"
                                        src={item.url}
                                        className="character-custom__item-img"
                                    />
                                </Button>
                            )
                        })}
                </div>
            </div>
        </div>
    )
}

export default CharacterCustomForm

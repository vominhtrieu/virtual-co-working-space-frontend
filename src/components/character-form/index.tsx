import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Dropdown, Menu } from 'antd'
import { Suspense, useContext, useState } from 'react'
import { FaSave, FaTimes } from 'react-icons/fa'
import { IoMdArrowDropdown } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Box from '../../components/models/Box'
import DisplayCharacter from '../../components/models/character/DisplayCharacter'
import CharacterContext from '../../context/CharacterContext'
import Button from '../UI/button'
import NewButton from '../UI/new-button'
import Popup from '../UI/popup'
import RadioButton from '../UI/radio-button'
import { CharacterFormProps } from './types'

const itemGroups = [
  {
    groupName: 'Hair',
    items: [
      { code: 'Hair1', url: './images/Hair1.png' },
      { code: 'Hair2', url: './images/Hair2.png' },
      { code: 'Hair1', url: './images/Hair1.png' },
      { code: 'Hair2', url: './images/Hair2.png' },
      { code: 'Hair1', url: './images/Hair1.png' },
      { code: 'Hair2', url: './images/Hair2.png' },
    ],
  },
  {
    groupName: 'Eyes',
    items: [
      { code: 'Eyes1', url: './images/Eyes1.png' },
      { code: 'Eyes2', url: './images/Eyes2.png' },
    ],
  },
]

const CharacterForm = (props: CharacterFormProps) => {
  const [itemGroupSelected, setItemGroupSelected] = useState(0)

  const { onClose } = props

  const { open } = useSelector((state: any) => state.sidebar)
  const character = useContext(CharacterContext)
  const navigate = useNavigate()

  const handleBottomMenuItemClick = ({ code }: any) => {
    switch (code) {
      case 'Hair1':
        character.changeCharacter({ ...character, hairStyle: 1 })
        break
      case 'Hair2':
        character.changeCharacter({ ...character, hairStyle: 2 })
        break
      case 'Eyes1':
        character.changeCharacter({ ...character, eyeStyle: 1 })
        break
      case 'Eyes2':
        character.changeCharacter({ ...character, eyeStyle: 2 })
        break
      default:
        break
    }
  }

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

  const handleClickCategory = (id: number) => {
    setItemGroupSelected(id)
  }

  return (
    <Popup onClose={onClose} title="Chỉnh sửa nhân vật" type="dark">
      <div className="character-custom__container">
        <div className="character-custom__container-left">
          <Canvas
            shadows={{ enabled: true, autoUpdate: true }}
            camera={{ position: [0, 2, 5], zoom: 2.2 }}
            style={{
              height: '100%',
              background: 'transparent',
              position: 'fixed',
              left: 0,
              width: '50%',
            }}
          >
            <OrbitControls
              addEventListener={undefined}
              hasEventListener={undefined}
              removeEventListener={undefined}
              dispatchEvent={undefined}
              enablePan={false}
              minPolarAngle={Math.PI / 2}
              maxPolarAngle={Math.PI / 2}
            />
            <directionalLight
              shadow={true}
              position={[0, 10, 10]}
              rotateX={45}
            />
            <ambientLight />
            <Suspense fallback={<Box />}>
              <DisplayCharacter
                appearance={character}
                startPosition={[0, -0.5, 0]}
                movable={false}
              />
            </Suspense>
          </Canvas>
        </div>

        <div className="character-custom__container-right">
          <RadioButton
            listCategory={itemGroups.map((item, index) => {
              return {
                id: index,
                name: item.groupName,
              }
            })}
            onClick={handleClickCategory}
          />
          <div className="character-custom__content">
            <div className="character-custom__list">
              <div className="character-custom__item-list">
                {itemGroups[itemGroupSelected].items &&
                  itemGroups[itemGroupSelected].items.map((item: any) => {
                    return (
                      <Button
                        className="character-custom__btn-select"
                        onClick={() => {
                          handleBottomMenuItemClick(item)
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
        </div>
      </div>
    </Popup>
  )
}

export default CharacterForm

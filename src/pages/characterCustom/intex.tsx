import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense, useContext } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CharacterCustomForm from '../../components/characterCustomForm'
import Box from '../../components/Models/Box'
import Character from '../../components/Models/Character'
import CharacterContext from '../../context/CharacterContext'

const itemGroups = [
  {
    groupName: 'Hair',
    items: [
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

const CharacterCustom = () => {
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

  return (
    <>
      <Canvas
        shadows={{ enabled: true, autoUpdate: true }}
        camera={{ position: [0, 2, 5], zoom: 2.2 }}
        style={{
          height: '100vh',
          background: '#42C2FF',
          position: 'fixed',
          top: 0,
          left: 0,
        }}
      >
        <OrbitControls
          addEventListener={undefined}
          hasEventListener={undefined}
          removeEventListener={undefined}
          dispatchEvent={undefined}
        />
        <directionalLight shadow={true} position={[0, 10, 10]} rotateX={45} />
        <ambientLight />
        <Suspense fallback={<Box />}>
          <Character
            hair={character.hairStyle}
            eyes={character.eyeStyle}
            startPosition={[0, -0.5, 0]}
            moveable={false}
          />
        </Suspense>
      </Canvas>

      {/* <BottomMenu
            itemGroups={itemGroups}
            onItemClick={handleBottomMenuItemClick}
          /> */}
      <CharacterCustomForm
        itemGroups={itemGroups}
        onItemClick={handleBottomMenuItemClick}
      />
    </>
  )
}

export default CharacterCustom

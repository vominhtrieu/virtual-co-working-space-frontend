// import ObjectProperties from "../Models/ObjectProperties";
// import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css'
import styled from 'styled-components'
// @ts-ignore
import Carousel from '@jjunyjjuny/react-carousel'
import { useState } from 'react'
import { Row, Col } from 'antd'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import Button from '../UI/button'

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 10,
  },
  desktop: {
    breakpoint: { max: 3000, min: 992 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 992, min: 576 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 576, min: 0 },
    items: 1,
  },
}

const Container = styled.div`
  margin: 0 auto;
  margin-top: 1 rem;
  width: 480px;
`
const Item = styled.div`
  background: #dbe4ff;
  text-align: center;
  font-size: 2rem;
  line-height: 145px;
  height: 150px;
  border-radius: 10px;
`

export default function BottomMenu({ itemGroups, onItemClick }: any) {
  const [position, setPosition] = useState(0)

  const handleButtonLeft = () => {
    if (position <= 0) return
    console.log(itemGroups[position])
    if (position >= 1) setPosition(position - 1)
  }

  const handleButtonRight = () => {
    console.log(itemGroups[position])
    if (position >= itemGroups.length - 1) return
    if (position < itemGroups.length - 1) setPosition(position + 1)
  }

  return (
    <div style={{ position: 'fixed', bottom: 50, width: '100%' }}>
      <Row>
        <Col span={2} offset={6}>
          <Button
            type="button"
            variant="outlined"
            className="menu-custom"
            onClick={handleButtonLeft}
          >
            <FaAngleLeft style={{ height: '1.5rem' }} />
          </Button>
        </Col>
        <Col span={6} offset={1}>
          <div
            style={{
              border: '0.2rem solid #777',
              borderRadius: '1rem',
              textAlign: 'center',
              padding: '0.5rem 1rem',
            }}
          >
            {itemGroups[position].groupName}
          </div>
        </Col>
        <Col span={2} offset={1}>
          <Button
            type="button"
            variant="outlined"
            className="menu-custom"
            onClick={handleButtonRight}
          >
            <FaAngleRight style={{ height: '1.5rem' }} />
          </Button>
        </Col>
      </Row>

      <div style={{ marginTop: '1rem' }}>
        <Container>
          <Carousel itemCountPerPanel={3}>
            {itemGroups[position].items &&
              itemGroups[position].items.map((item: any) => {
                return (
                  <Item key={item.code}>
                    <Button
                      type="button"
                      variant="outlined"
                      className="menu-custom"
                      onClick={() => {
                        onItemClick(item)
                      }}
                    >
                      <img
                        alt="models"
                        src={item.url}
                        style={{
                          width: '6em',
                          height: '6em',
                          borderRadius: '10px',
                          margin: '0 1rem',
                        }}
                      />
                    </Button>
                  </Item>
                )
              })}
          </Carousel>
        </Container>
      </div>

    </div>
  )
}

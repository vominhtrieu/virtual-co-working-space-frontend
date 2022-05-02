import 'react-multi-carousel/lib/styles.css'
import {useState} from 'react'
import {Row, Col} from 'antd'
import {FaAngleLeft, FaAngleRight, FaCheckCircle} from 'react-icons/fa'
import Button from '../UI/button'

const responsive = {
    superLargeDesktop: {
        breakpoint: {max: 4000, min: 3000},
        items: 10,
    },
    desktop: {
        breakpoint: {max: 3000, min: 992},
        items: 5,
    },
    tablet: {
        breakpoint: {max: 992, min: 576},
        items: 3,
    },
    mobile: {
        breakpoint: {max: 576, min: 0},
        items: 1,
    },
}

export default function BottomMenu({itemGroups, onItemClick}: any) {
    const [position, setPosition] = useState(0)

    const handleButtonLeft = () => {
        if (position <= 0) return
        if (position >= 1) setPosition(position - 1)
    }

    const handleButtonRight = () => {
        if (position >= itemGroups.length - 1) return
        if (position < itemGroups.length - 1) setPosition(position + 1)
    }

    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            width: '100%',
            zIndex: 9999999,
            display: "flex",
            justifyContent: "center",
            pointerEvents: "all",
        }}>
            <div style={{
                width: "100%",
                maxWidth: 600,
                background: "white",
                padding: 20,
                paddingTop: 10,
                boxShadow: "0 0 2px 2px rgba(0,0,0,0.15)",
            }}>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingBottom: 5,
                }}>
                    <button onClick={handleButtonLeft}
                            style={{
                                padding: 0, background: "none", border: "none", margin: 0,
                                display: "flex", alignItems: "center",
                                justifyContent: "flex-end",
                                width: 100,
                                outline: "none"
                            }}>
                        {position > 0 &&
                            <h3 style={{
                                margin: 0,
                                textAlign: "right",
                                opacity: 0.8
                            }}>{itemGroups[position - 1].groupName}</h3>
                        }
                    </button>
                    <h2 style={{margin: 0, marginLeft: 5, marginRight: 5, width: 120, textAlign: "center"}}>
                        {itemGroups[position].groupName}
                    </h2>
                    <button onClick={handleButtonRight}
                            style={{
                                padding: 0, background: "none", border: "none", margin: 0,
                                display: "flex", alignItems: "center",
                                width: 100,
                                outline: "none"
                            }}>
                        {position < itemGroups.length - 1 &&
                            <h3 style={{margin: 0, opacity: 0.8}}>{itemGroups[position + 1].groupName}</h3>
                        }
                    </button>
                </div>

                <div style={{marginTop: '1rem', display: "flex", justifyContent: "center", alignItems: "center"}}>
                    {itemGroups[position].items &&
                        itemGroups[position].items.map((item: any, index: number) => {
                            return (
                                <Button key={item.code}
                                        type="button"
                                        variant="outlined"
                                        className="menu-custom"
                                        style={{
                                            width: 100,
                                            height: 100,
                                            marginRight: 5,
                                            marginLeft: 5,
                                            padding: 0,
                                            background: item.type === "color" ? item.hex : "white",
                                            borderColor: "#333333",
                                            borderWidth: 4,
                                            borderRadius: 25,
                                            overflow: "hidden",
                                            position: "relative",
                                        }}
                                        onClick={() => {
                                            onItemClick(item)
                                        }}
                                >
                                    {item.type === "image" && <img
                                        alt="models"
                                        src={item.url}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    />}
                                    {index === 0 &&
                                        <div style={{
                                            position: "absolute", top: 0, left: 0,
                                            width: 95,
                                            height: 95,
                                            background: "#80808033",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                            <FaCheckCircle style={{margin: 0}} size={36}/>
                                        </div>}
                                </Button>
                            )
                        })}
                </div>
            </div>
        </div>
    )
}

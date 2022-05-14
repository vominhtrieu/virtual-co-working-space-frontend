import {useEffect, useState} from "react";
import {AiFillSetting, AiOutlineInfoCircle} from "react-icons/ai";
import {BiRotateLeft, BiRotateRight} from "react-icons/bi";
import {FaRegSmileBeam, FaTrash} from "react-icons/fa";
import {IoMdChatbubbles} from "react-icons/io";
import SidebarChat from "../../pages/officeDetail/chat";
import InteractionMenu from "../layouts/sidebar/offices/characterInteraction";
import EditOffice from "../layouts/sidebar/offices/editOffice";
import Button from "../UI/button";
import {getOfficeItems} from "../../services/api/offices/office-item";

const itemGroups = [
    {
        groupName: "Chair",
        items: [
            {code: "SofaChair", url: "/images/SofaChair.png"},
            {code: "Chair", url: "/images/Chair.png"},
            {code: "YellowChair", url: "/images/YellowChair.png"},
        ],
    },
    {
        groupName: "Table",
        items: [
            {code: "ModernTable", url: "/images/ModernTable.png"},
            {code: "CoffeeTable", url: "/images/CoffeeTable.png"},
        ],
    },
    {
        groupName: "Indoor Tree",
        items: [{code: "IndoorTree", url: "/images/IndoorTree.png"}],
    },
    {
        groupName: "Keyboard",
        items: [{code: "Keyboard", url: "/images/Keyboard.png"}],
    },
];

export default function OfficeInterface({
                                            open,
                                            conversationId,
                                            isShowChatBox,
                                            isCustomizing,
                                            setIsCustomizing,
                                            setCharacterGesture,
                                            setCharacterEmoji,
                                            objectActionVisible,
                                            object3dClickPos,
                                            handleButtonDeleteClick,
                                            handleButtonRotateLeftClick,
                                            handleButtonRotateRightClick,
                                            handleItemInBottomMenuClick,
                                            isOwner,
                                            setIsShowDetailForm,
                                            setIsShowChatBox,
                                        }) {
    const [showInteractMenu, setShowInteractMenu] = useState(false);
    const [officeItems, setOfficeItems] = useState<any>([]);

    useEffect(() => {
        getOfficeItems().then((data) => {
            console.log(data)
        })
    }, [])

    return (
        <>
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: open !== "" ? "46rem" : "6rem",
                    right: 0,
                    width: "100%",
                    height: "100%",
                    textAlign: "left",
                    pointerEvents: "none",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
                {!isCustomizing && (
                    <>
                        <div
                            aria-label="interactionMenu"
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                margin: "0.5rem 1rem",
                                alignItems: "flex-start",
                                position: "absolute",
                                zIndex: "999999",
                                pointerEvents: "auto",
                            }}
                        >
                            <Button
                                onClick={() => setShowInteractMenu((value) => !value)}
                                type="button"
                                variant="outlined"
                                className="menu-custom"
                            >
                                <FaRegSmileBeam style={{width: "1.5rem", height: "1.5rem"}}/>
                            </Button>
                            {showInteractMenu && (
                                <InteractionMenu
                                    onGestureClick={(value: number) =>
                                        setCharacterGesture({idx: value})
                                    }
                                    onEmojiClick={(value: number) =>
                                        setCharacterEmoji({idx: value})
                                    }
                                />
                            )}
                        </div>
                    </>
                )}
                {isCustomizing ? (
                    <>
                        {objectActionVisible && (
                            <div
                                aria-label="actionContainer"
                                style={{pointerEvents: "none"}}
                            >
                                <div
                                    style={{
                                        position: "absolute",
                                        left: `${object3dClickPos.x}px`,
                                        top: `${object3dClickPos.y - 10}px`,
                                        marginLeft: "10rem",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "10px",
                                        pointerEvents: "auto",
                                    }}
                                >
                                    <Button
                                        type="button"
                                        variant="outlined"
                                        className="menu-custom"
                                        onClick={handleButtonDeleteClick}
                                    >
                                        <FaTrash style={{width: "1.5rem", height: "1.5rem"}}/>
                                    </Button>

                                    <Button
                                        type="button"
                                        variant="outlined"
                                        className="menu-custom"
                                        onClick={handleButtonRotateLeftClick}
                                    >
                                        <BiRotateLeft
                                            style={{width: "1.5rem", height: "1.5rem"}}
                                        />
                                    </Button>

                                    <Button
                                        type="button"
                                        variant="outlined"
                                        className="menu-custom"
                                        onClick={handleButtonRotateRightClick}
                                    >
                                        <BiRotateRight
                                            style={{width: "1.5rem", height: "1.5rem"}}
                                        />
                                    </Button>
                                </div>
                            </div>
                        )}

                        <div aria-label="bottomMenu" style={{pointerEvents: "auto"}}>
                            <EditOffice
                                itemGroups={itemGroups}
                                onItemClick={handleItemInBottomMenuClick}
                            />
                        </div>
                    </>
                ) : null}
            </div>

            {isShowChatBox && <SidebarChat conversationId={conversationId}/>}

            <div className="office-detail__group-btn">
                {isOwner ? (
                    <div className="office-detail__view">
                        <AiFillSetting
                            className="office-detail__edit-icon"
                            onClick={() => {
                                setIsCustomizing(!isCustomizing);
                            }}
                        />
                    </div>
                ) : null}
                <div className="office-detail__view">
                    <IoMdChatbubbles
                        className="office-detail__edit-icon"
                        onClick={() => {
                            setIsShowChatBox((curr) => !curr);
                        }}
                    />
                </div>
                <div className="office-detail__view">
                    <AiOutlineInfoCircle
                        className="office-detail__edit-icon"
                        onClick={() => {
                            setIsShowDetailForm(true);
                        }}
                    />
                </div>
            </div>
        </>
    );
}

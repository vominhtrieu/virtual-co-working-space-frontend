import { Button, Tabs } from "antd"
import { InteractionMenuProps } from "./types";

const { TabPane } = Tabs;

const gestureList = ["Wave", "Rumba"]

const emojiList = ["Smile", "Sad"]

const InteractionMenu = (props: InteractionMenuProps) => {
    return (
        <div className="interact-menu">
            <Tabs defaultActiveKey="1">
                <TabPane tab="Gestures" key="1">
                    <div className="interact-menu__content">
                        {gestureList.map((gesture, idx) => (
                            <Button className="interact-menu__item" key={gesture} onClick={() => props.onGestureClick(idx)}>
                                <div className="interact-menu__item-img" >img</div>
                                <p className="interact-menu__item-text">{gesture}</p>
                            </Button>
                        ))}
                    </div>
                </TabPane>
                <TabPane tab="Emojis" key="2">
                    <div className="interact-menu__content">
                        {emojiList.map((emoji, idx) => (
                            <Button className="interact-menu__item" key={emoji} onClick={() => props.onEmojiClick(idx)}>
                                <div className="interact-menu__item-img" >img</div>
                                <p className="interact-menu__item-text">{emoji}</p>
                            </Button>
                        ))}
                    </div>
                </TabPane>
            </Tabs>
        </div>
    )
}

export default InteractionMenu
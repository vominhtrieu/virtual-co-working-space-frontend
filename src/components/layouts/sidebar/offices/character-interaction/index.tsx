import { Button, Tabs } from "antd"
import { InteractionMenuProps } from "./types";
import { ANIMATION_LIST, EMOJI_LIST } from "../../../../../helpers/constants";

const { TabPane } = Tabs;

const InteractionMenu = (props: InteractionMenuProps) => {
    return (
        <div className="interact-menu">
            <Tabs defaultActiveKey="1">
                <TabPane tab="Gestures" key="1">
                    <div className="interact-menu__content">
                        {ANIMATION_LIST.map((gesture, idx) => (
                            (idx > 1) && <Button className="interact-menu__item" key={gesture} onClick={() => props.onGestureClick(idx)}>
                                <div className="interact-menu__item-img" >img</div>
                                <p className="interact-menu__item-text">{gesture}</p>
                            </Button>
                        ))}
                    </div>
                </TabPane>
                <TabPane tab="Emojis" key="2">
                    <div className="interact-menu__content">
                        {EMOJI_LIST.map((emoji, idx) => (
                            <Button className="interact-menu__item" key={emoji} onClick={() => props.onEmojiClick(idx)}>
                                <img src={require(`../../../../../assets/images/emojis/${emoji}.png`)} alt={`emoji_${idx}`} className="interact-menu__item-img" />
                            </Button>
                        ))}
                    </div>
                </TabPane>
            </Tabs>
        </div>
    )
}

export default InteractionMenu
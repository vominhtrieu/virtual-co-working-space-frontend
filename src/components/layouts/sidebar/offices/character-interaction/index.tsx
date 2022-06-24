import { Button, Tabs } from "antd";
import { InteractionMenuProps } from "./types";
import { ANIMATION_LIST, EMOJI_LIST } from "../../../../../helpers/constants";
import { useTranslation } from "react-i18next";

const { TabPane } = Tabs;

const InteractionMenu = (props: InteractionMenuProps) => {
  const { t } = useTranslation();

  return (
    <div className={`interact-menu${props.mobile ? " mobile" : ""}`}>
      <Tabs defaultActiveKey="1">
        <TabPane tab={t("pages.office.emoji.gestures")} key="1">
          <div className="interact-menu__content">
            {ANIMATION_LIST.map(
              (gesture, idx) =>
                idx > 1 && (
                  <Button
                    className="interact-menu__item"
                    key={gesture}
                    onClick={() => props.onGestureClick(idx)}
                  >
                    <img
                      src={require(`../../../../../assets/images/gestures/${gesture}.png`)}
                      alt={`gesture_${idx}`}
                      className="interact-menu__item-img"
                    />
                    <p className="interact-menu__item-text">{gesture}</p>
                  </Button>
                )
            )}
          </div>
        </TabPane>
        <TabPane tab={t("pages.office.emoji.emojis")} key="2">
          <div className="interact-menu__content">
            {EMOJI_LIST.map((emoji, idx) => (
              <Button
                className="interact-menu__item"
                key={emoji}
                onClick={() => props.onEmojiClick(idx)}
              >
                <img
                  src={require(`../../../../../assets/images/emojis/${emoji}.png`)}
                  alt={`emoji_${idx}`}
                  className="interact-menu__item-img"
                />
              </Button>
            ))}
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default InteractionMenu;

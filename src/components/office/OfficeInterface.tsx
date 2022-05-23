import { useState } from "react";
import { BiRotateLeft, BiRotateRight } from "react-icons/bi";
import { FaRegSmileBeam, FaTrash } from "react-icons/fa";
import SidebarChat from "../../pages/office-detail/chat";
import InteractionMenu from "../layouts/sidebar/offices/character-interaction";
import EditOffice from "../layouts/sidebar/offices/edit-office";
import Button from "../UI/button";
import OfficeBar from "./office-bar";
import OfficceCheckInModal from "./office-checkin/OfficeCheckInModal";

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
  setAction,
  action,
}) {
  const [showInteractMenu, setShowInteractMenu] = useState(false);

  return (
    <>
      <OfficceCheckInModal />
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
        {isCustomizing ? (
          <>
            {objectActionVisible && (
              <div
                aria-label="actionContainer"
                style={{ pointerEvents: "none" }}
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
                    <FaTrash style={{ width: "1.5rem", height: "1.5rem" }} />
                  </Button>

                  <Button
                    type="button"
                    variant="outlined"
                    className="menu-custom"
                    onClick={handleButtonRotateLeftClick}
                  >
                    <BiRotateLeft
                      style={{ width: "1.5rem", height: "1.5rem" }}
                    />
                  </Button>

                  <Button
                    type="button"
                    variant="outlined"
                    className="menu-custom"
                    onClick={handleButtonRotateRightClick}
                  >
                    <BiRotateRight
                      style={{ width: "1.5rem", height: "1.5rem" }}
                    />
                  </Button>
                </div>
              </div>
            )}

            <div aria-label="bottomMenu" style={{ pointerEvents: "auto" }}>
              <EditOffice onItemClick={handleItemInBottomMenuClick} />
            </div>
          </>
        ) : null}
      </div>

      {isShowChatBox && <SidebarChat conversationId={conversationId} />}

      <OfficeBar isOwner={isOwner} action={action} setAction={setAction} />

      {/* <div className="office-detail__group-btn">
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
      </div> */}
    </>
  );
}

import { useState } from "react";
import { BiRotateLeft, BiRotateRight } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { useAppSelector } from "../../stores";
import { gameSelectors } from "../../stores/game-slice";
import { GameState } from "../../types/game-state";
import Button from "../UI/button";
import { GameStartMessage } from "./GameStartMessage";
import OfficeBar from "./office-bar";
import { OfficeMessage } from "./OfficeMessage";

export default function OfficeInterface({
  open,
  officeDetail,
  isCustomizing,
  objectActionVisible,
  object3dClickPos,
  handleButtonDeleteClick,
  handleButtonRotateLeftClick,
  handleButtonRotateRightClick,
  handleItemInBottomMenuClick,
  isOwner,
  setAction,
  action,
  message
}) {
  const gameState = useAppSelector(gameSelectors.getGameState);
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
                    <FaTrash
                      style={{
                        fontSize: 16,
                      }}
                    />
                  </Button>

                  <Button
                    type="button"
                    variant="outlined"
                    className="menu-custom"
                    onClick={handleButtonRotateLeftClick}
                  >
                    <BiRotateLeft
                      style={{
                        fontSize: 22,
                      }}
                    />
                  </Button>

                  <Button
                    type="button"
                    variant="outlined"
                    className="menu-custom"
                    onClick={handleButtonRotateRightClick}
                  >
                    <BiRotateRight
                      style={{
                        fontSize: 22,
                      }}
                    />
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : null}
      </div>
      {message && <OfficeMessage message={message} />}
      {gameState === GameState.PREPARE && <GameStartMessage /> }
      <OfficeBar
        officeDetail={officeDetail}
        isOwner={isOwner}
        action={action}
        setAction={setAction}
      />

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

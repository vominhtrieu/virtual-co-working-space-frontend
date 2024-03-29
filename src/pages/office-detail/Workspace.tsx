import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaGrin } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CharacterForm from "../../components/character-form";
import InteractionMenu from "../../components/layouts/sidebar/offices/character-interaction";
import EditOffice from "../../components/layouts/sidebar/offices/edit-office";
import OfficeDetailForm from "../../components/office-detail-form";
import ChatBox from "../../components/office/chat-box";
import ChatList from "../../components/office/chat-list";
import MemberList from "../../components/office/member-list";
import OfficeSetting from "../../components/office/office-setting";
import OfficeCanvas from "../../components/office/OfficeCanvas";
import OfficeInterface from "../../components/office/OfficeInterface";
import { toastError } from "../../helpers/toast";
import { Item } from "../../services/api/offices/get-office-item/types";
import { getMemberAppearances } from "../../services/api/offices/member-appearances";
import { MemberAppearance } from "../../services/api/offices/member-appearances/types";
import { OfficeItem } from "../../services/api/offices/officce-item/types";
import { OfficeMembersInterface } from "../../services/api/offices/office-detail/types";
import OfficeDetailProxy from "../../services/proxy/offices/office-detail";
import { useAppDispatch, useAppSelector } from "../../stores";
import { userSelectors } from "../../stores/auth-slice";
import {
  gameSelectors,
  playerOut,
  setPlayerLeft,
} from "../../stores/game-slice";
import { officeSelectors } from "../../stores/office-slice";
import { socketSelector } from "../../stores/socket-slice";
import { GameState } from "../../types/game-state";
import { ProxyStatusEnum } from "../../types/http/proxy/ProxyStatus";
import { OfficeDetailInterface } from "../../types/office";
import WinnerBox from "./WinnerBox";

export type positionType = {
  x: number;
  y: number;
};

interface WorkspaceProps {
  mobile?: boolean;
}

const Workspace = ({ mobile = false }: WorkspaceProps) => {
  const [isRefetchData, setIsRefetchData] = useState(1);
  const [conversationId, setConversationId] = useState<number>(0);
  const [isOwner, setIsOwner] = useState(false);
  const { open } = useSelector((state: any) => state.sidebar);
  const [objectList, setObjectList] = useState<OfficeItem[]>([]);
  const [selectedKey, setSelectedKey] = useState(null);
  const [selectedObject, setSelectedObject] = useState<any>(null);
  const [objectActionVisible, setObjectActionVisible] = useState(false);
  const [object3dClickPos, setObjectionClickPos] = useState<positionType>({
    x: 0,
    y: 0,
  });
  const [characterGesture, setCharacterGesture] = useState({ idx: -1 });
  const [characterEmoji, setCharacterEmoji] = useState({ idx: -1 });
  const [onlineMembers, setOnlineMembers] = useState<OfficeMembersInterface[]>(
    []
  );
  const isOffice = useAppSelector(officeSelectors.getIsOffice);
  const [officeDetail, setOfficeDetail] = useState<OfficeDetailInterface>();
  const [memberAppearances, setMemberAppearances] = useState<
    MemberAppearance[]
  >([]);

  const [action, setAction] = useState<
    | "action"
    | "character"
    | "config"
    | "member"
    | "chatList"
    | "chatBox"
    | "setting"
    | "detail"
    | ""
  >("");

  const params: any = useParams();

  const officeId = +params.id;

  const userInfo = useAppSelector(userSelectors.getUserInfo);
  const gameState = useAppSelector(gameSelectors.getGameState);
  const isWinner = useAppSelector(gameSelectors.getIsWinner);
  const socket = useAppSelector(socketSelector.getSocket);
  const [message, setMessage] = useState<string | null>(null);
  const [winnerBoxVisible, setWinnerBoxVisible] = useState(false);

  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const gameWinner = useRef<string>("");

  const handleObject3dDragged = useCallback(
    (position, rotation) => {
      socket.emit("office_item:move", {
        id: selectedKey,
        transform: {
          xRotation: rotation.x,
          yRotation: rotation.y,
          zRotation: rotation.z,
          xPosition: position.x,
          yPosition: position.y,
          zPosition: position.z,
        },
      });
    },
    [selectedKey, socket]
  );

  const handleObject3dRotated = () => {
    socket.emit("office_item:move", {
      id: selectedKey,
      transform: {
        xRotation: selectedObject.rotation.x,
        yRotation: selectedObject.rotation.y,
        zRotation: selectedObject.rotation.z,
        xPosition: selectedObject.position.x,
        yPosition: selectedObject.position.y,
        zPosition: selectedObject.position.z,
      },
    });
  };

  const handleButtonRotateLeftClick = () => {
    selectedObject.rotation.y += Math.PI / 2;
    handleObject3dRotated();
  };

  const handleButtonRotateRightClick = () => {
    selectedObject.rotation.y -= Math.PI / 2;
    handleObject3dRotated();
  };

  const handleButtonDeleteClick = () => {
    const idx = objectList.findIndex((obj) => obj.id === selectedKey);
    const newObjectList = [...objectList];
    newObjectList.splice(idx, 1);
    setObjectList([...newObjectList]);
    setSelectedObject(null);
    setSelectedKey(null);
    setObjectActionVisible(false);
    socket.emit("office_item:delete", {
      id: selectedKey,
    });
  };

  useEffect(() => {
    socket.on("office_member:online", (message) => {
      const newMember: OfficeMembersInterface =
        message as OfficeMembersInterface;
      if (onlineMembers.findIndex((member) => member.id === newMember.id) < 0) {
        newMember.onlineStatus = "online";
        setOnlineMembers([...onlineMembers, newMember]);
      }
    });

    return () => {
      socket.removeListener("office_member:online");
    };
  }, [socket, onlineMembers]);

  useEffect(() => {
    socket.on("office_member:offline", (memberId) => {
      if (memberId === userInfo.id) {
        return;
      }
      setOnlineMembers(
        onlineMembers.filter((member) => member.member.id !== memberId)
      );
      dispatch(playerOut());
    });

    return () => {
      socket.removeListener("office_member:offline");
    };
  }, [socket, onlineMembers]);

  useEffect(() => {
    socket.on("office_item:created", (message) => {
      setObjectList((objectList) => [...objectList, message]);
    });

    socket.on("office_item:deleted", (message) => {
      const idx = objectList.findIndex((obj) => obj.id === message);
      const newObjectList = [...objectList];
      newObjectList.splice(idx, 1);
      setObjectList([...newObjectList]);
    });

    return () => {
      socket.removeListener("office_item:created");
      socket.removeListener("office_item:deleted");
    };
  }, [socket, objectList]);

  useEffect(() => {
    socket.on("office_item:moved", (message) => {
      const { id, transform } = message;
      const idx = objectList.findIndex((obj) => obj.id === id);
      const newObjectList = [...objectList];
      // change newObjectList[idx] transform
      newObjectList[idx].transform = {
        xPosition: transform.xPosition,
        yPosition: transform.yPosition,
        zPosition: transform.zPosition,
        xRotation: transform.xRotation,
        yRotation: transform.yRotation,
        zRotation: transform.zRotation,
      };
      setObjectList([...newObjectList]);
    });

    return () => {
      socket.removeListener("office_item:moved");
    };
  }, [socket, objectList]);

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("office_member:join", {
        officeId: officeId,
      });
    });
  }, [officeId, socket]);

  const handleItemInBottomMenuClick = (item: Item) => {
    socket.emit("office_item:create", {
      itemId: item.id,
      officeId: officeId,
      xPosition: 0,
      yPosition: 0,
      zPosition: 0,
      xRotation: 0,
      yRotation: 0,
      zRotation: 0,
    });
  };

  const handleSelectConversation = (conversationId: number) => {
    setConversationId(conversationId);
    setAction("chatBox");
  };

  const handleSubmitMessage = (values: string, tempId: string) => {
    socket.emit("message:send", {
      conversationId: conversationId,
      content: values,
      tempId: tempId,
    });
  };

  const handleEmojiClick = (emojiIdx: number) => {
    setCharacterEmoji({ idx: emojiIdx });

    socket.emit("emoji", {
      emojiId: emojiIdx,
    });
  };

  const handleGestureClick = (gestureIdx: number) => {
    setCharacterGesture({ idx: gestureIdx });

    socket.emit("gesture", {
      gestureId: gestureIdx,
    });
  };

  useEffect(() => {
    if (action !== "chatBox") {
      socket.emit("conversation:leave", {
        conversationId: conversationId,
      });
    }
  }, [conversationId, socket, action]);

  useEffect(() => {
    OfficeDetailProxy({ id: officeId })
      .then((res) => {
        if (res.status === ProxyStatusEnum.FAIL) {
          toastError(t(`error.${res.message}`) ?? "Get offices detail fail");
          return;
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          setOfficeDetail(res.data.office ?? {});
          setIsOwner(res?.data?.office?.createdBy?.id === userInfo.id);

          if (res?.data?.office?.officeMembers.length > 0) {
            setOnlineMembers(
              res.data.office.officeMembers.filter(
                (member) =>
                  member.onlineStatus === "online" ||
                  member.member.id === userInfo.id
              )
            );
          }

          if (res.data.office?.officeItems.length > 0) {
            setObjectList(res.data.office.officeItems);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [officeId, userInfo.id, isOffice, isRefetchData]);

  useEffect(() => {
    getMemberAppearances(officeId).then((data) => {
      setMemberAppearances(data);
    });
  }, [officeId]);

  useEffect(() => {
    socket.on("conversation:updated", (value) => {
      //change conversation name
      setOfficeDetail((curr) => {
        return curr
          ? {
              ...curr,
              conversations: curr?.conversations.map((conversation) => {
                if (conversation.id === value.conversation.id) {
                  return {
                    ...conversation,
                    name: value.conversation.name,
                  };
                }
                return conversation;
              }),
            }
          : undefined;
      });
    });

    return () => {
      socket.off("conversation:updated");
    };
  }, [socket]);

  useEffect(() => {
    socket.on("action", (message) => {
      if (message.action === "win") {
        const winnerId = message.userId;
        const winner = officeDetail?.officeMembers.find(
          (member) => member.member.id === winnerId
        );
        if (winner) {
          gameWinner.current = winner.member.name;
          setWinnerBoxVisible(true);
        }
      }
    });
  });

  useEffect(() => {
    if (gameState !== GameState.NOT_PLAYING) {
      dispatch(setPlayerLeft(onlineMembers.length));
    }
  }, [gameState]);

  useEffect(() => {
    if (isWinner) {
      gameWinner.current = userInfo.name;
      setWinnerBoxVisible(true);
    }
  }, [isWinner]);

  return (
    <>
      <OfficeCanvas
        setObjectionClickPos={setObjectionClickPos}
        characterGesture={characterGesture}
        characterEmoji={characterEmoji}
        objectActionVisible={objectActionVisible}
        objectList={objectList}
        selectedObject={selectedObject}
        selectedKey={selectedKey}
        setObjectActionVisible={setObjectActionVisible}
        setSelectedKey={setSelectedKey}
        setSelectedObject={setSelectedObject}
        handleObject3dDragged={handleObject3dDragged}
        onlineMembers={onlineMembers}
        action={action}
        memberAppearances={memberAppearances}
        setMessage={setMessage}
        mobile={mobile}
      />
      {!mobile && (
        <OfficeInterface
          open={open}
          officeDetail={officeDetail}
          isCustomizing={action === "config"}
          objectActionVisible={objectActionVisible}
          handleButtonDeleteClick={handleButtonDeleteClick}
          handleButtonRotateLeftClick={handleButtonRotateLeftClick}
          handleButtonRotateRightClick={handleButtonRotateRightClick}
          handleItemInBottomMenuClick={handleItemInBottomMenuClick}
          object3dClickPos={object3dClickPos}
          isOwner={isOwner}
          setAction={setAction}
          message={message}
          action={action}
        />
      )}

      {action === "detail" && (
        <OfficeDetailForm
          onClose={() => {
            setAction("");
          }}
          id={officeId}
          isOwner={isOwner}
        />
      )}

      {action === "chatList" && (
        <ChatList
          onClose={() => setAction("")}
          id={+officeId}
          onSelectConversation={handleSelectConversation}
          officeDetail={officeDetail!}
        />
      )}

      {action === "chatBox" && (
        <ChatBox
          conversationId={conversationId}
          onBack={() => setAction("chatList")}
          onClose={() => setAction("")}
          submitMessage={handleSubmitMessage}
          officeDetail={officeDetail!}
          conversationName={
            officeDetail?.conversations.find(
              (conversation) => conversation.id === conversationId
            )?.name
          }
        />
      )}

      {action === "member" && (
        <MemberList
          onClose={() => setAction("")}
          officeDetail={officeDetail!}
          onRefetchData={() => setIsRefetchData((curr) => curr + 1)}
        />
      )}

      {action === "character" && (
        <CharacterForm onClose={() => setAction("")} />
      )}

      {mobile && (
        <button
          onClick={() => {
            setAction(action === "action" ? "" : "action");
          }}
          className="mobile-gesture-emoji"
        >
          <FaGrin size={20} />
        </button>
      )}
      <WinnerBox
        name={gameWinner.current}
        onEnd={() => {
          setWinnerBoxVisible(false);
        }}
        visible={winnerBoxVisible}
      />
      {action === "action" && (
        <InteractionMenu
          onGestureClick={handleGestureClick}
          onEmojiClick={handleEmojiClick}
          mobile={mobile}
        />
      )}

      {action === "config" && (
        <EditOffice
          onClose={() => setAction("")}
          onItemClick={handleItemInBottomMenuClick}
        />
      )}

      {action === "setting" && <OfficeSetting onClose={() => setAction("")} />}
    </>
  );
};

export default Workspace;

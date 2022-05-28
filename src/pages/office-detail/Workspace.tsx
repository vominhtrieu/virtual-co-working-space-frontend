import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import CharacterForm from "../../components/character-form";
import InteractionMenu from "../../components/layouts/sidebar/offices/character-interaction";
import OfficeDetailForm from "../../components/office-detail-form";
import ChatBox from "../../components/office/chat-box";
import ChatList from "../../components/office/chat-list";
import MemberList from "../../components/office/member-list";
import OfficeCanvas from "../../components/office/OfficeCanvas";
import OfficeInterface from "../../components/office/OfficeInterface";
import { Item } from "../../services/api/offices/get-office-item/types";
import OfficeDetailProxy from "../../services/proxy/offices/office-detail";
import { useAppSelector } from "../../stores";
import { userSelectors } from "../../stores/auth-slice";
import { socketSelector } from "../../stores/socket-slice";
import { ProxyStatusEnum } from "../../types/http/proxy/ProxyStatus";
import CallingBar from "./calling/CallingBar";
import { OfficeItem } from "../../services/api/offices/officce-item/types";

export type positionType = {
  x: number;
  y: number;
};

const Workspace = () => {
  const [conversationId, setConversationId] = useState<number>(0);
  const [isOwner, setIsOwner] = useState(false);
  const { open } = useSelector((state: any) => state.sidebar);
  const [isShowDetailForm, setIsShowDetailForm] = useState(false);
  const [isShowChatBox, setIsShowChatBox] = useState(false);
  const [objectList, setObjectList] = useState<OfficeItem[]>([]);
  const [selectedKey, setSelectedKey] = useState(null);
  const [selectedObject, setSelectedObject] = useState<any>(null);
  const [objectActionVisible, setObjectActionVisible] = useState(false);
  const [object3dClickPos, setObjectionClickPos] = useState<positionType>({
    x: 0,
    y: 0,
  });
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [characterGesture, setCharacterGesture] = useState({ idx: -1 });
  const [characterEmoji, setCharacterEmoji] = useState({ idx: -1 });

  const [action, setAction] = useState<
    | "action"
    | "character"
    | "config"
    | "member"
    | "chatList"
    | "chatBox"
    | "setting"
    | ""
  >("");

  const location = useLocation();

  const locationState: any = location.state;
  const officeId = locationState["officeId"];

  const userInfo = useAppSelector(userSelectors.getUserInfo);

  const socket = useAppSelector(socketSelector.getSocket);

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
    // navigate("/");
    setObjectList([...newObjectList]);
    setSelectedObject(null);
    setSelectedKey(null);
    setObjectActionVisible(false);
    socket.emit("office_item:delete", selectedKey);
  };

  useEffect(() => {
    socket.on("office_item:created", (message) => {
      console.log(message);
      setObjectList((objectList) => [...objectList, message]);
    });

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

    socket.on("office_item:deleted", (message) => {
      const idx = objectList.findIndex((obj) => obj.id === message);
      const newObjectList = [...objectList];
      newObjectList.splice(idx, 1);
      setObjectList([...newObjectList]);
    });

    return () => {
      socket.removeListener("office_item:created");
      socket.removeListener("office_item:moved");
    };
  }, [socket, objectList]);

  useEffect(() => {
    console.log("join office ", officeId);
    socket.emit("office_member:join", {
      officeId: officeId,
    });
  }, [officeId, socket]);

  const handleItemInBottomMenuClick = (item: Item) => {
    // setObjectList((objectList) => [
    //     ...objectList,
    //     item,
    // ]);
    socket.emit("office_item:create", {
      itemId: item.id,
      officeId: officeId,
      xPosition: 0,
      yPosition: 1,
      zPosition: 0,
      xRotation: 0,
      yRotation: 0,
      zRotation: 0,
    });
  };

  useEffect(() => {
    OfficeDetailProxy({ id: officeId })
      .then((res) => {
        if (res.status === ProxyStatusEnum.FAIL) {
          return;
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          setIsOwner(res?.data?.office?.createdBy?.id === userInfo.id);
          if (res?.data?.office?.conversations.length > 0) {
            setConversationId(res?.data?.office?.conversations[0]?.id);
          }
          if (res?.data?.office?.officeItems.length > 0) {
            setObjectList(res.data.office.officeItems);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [officeId, userInfo.id]);

  useEffect(() => {
    console.log("Object list: ", objectList);
  }, [objectList]);

  const handleSelectConversation = (conversationId: number) => {
    setConversationId(conversationId);
    setAction("chatBox");
  };

  const handleSubmitMessage = (values: string) => {
    socket.emit("message:send", {
      conversationId: conversationId,
      content: values,
    });
  };

  useEffect(() => {
    if (action !== "chatBox") {
      socket.emit("conversation:leave", {
        conversationId: conversationId,
      });
    }
  }, [conversationId, socket, action]);

  return (
    <>
      {!isCustomizing && <CallingBar />}
      <OfficeCanvas
        setObjectionClickPos={setObjectionClickPos}
        characterGesture={characterGesture}
        characterEmoji={characterEmoji}
        isCustomizing={isCustomizing}
        objectActionVisible={objectActionVisible}
        objectList={objectList}
        selectedObject={selectedObject}
        selectedKey={selectedKey}
        setObjectActionVisible={setObjectActionVisible}
        setSelectedKey={setSelectedKey}
        setSelectedObject={setSelectedObject}
        handleObject3dDragged={handleObject3dDragged}
      />
      <OfficeInterface
        open={open}
        conversationId={conversationId}
        isShowChatBox={isShowChatBox}
        isCustomizing={action === "config"}
        objectActionVisible={objectActionVisible}
        handleButtonDeleteClick={handleButtonDeleteClick}
        handleButtonRotateLeftClick={handleButtonRotateLeftClick}
        handleButtonRotateRightClick={handleButtonRotateRightClick}
        handleItemInBottomMenuClick={handleItemInBottomMenuClick}
        object3dClickPos={object3dClickPos}
        isOwner={isOwner}
        setCharacterEmoji={setCharacterEmoji}
        setCharacterGesture={setCharacterGesture}
        setIsCustomizing={setIsCustomizing}
        setIsShowDetailForm={setIsShowDetailForm}
        setIsShowChatBox={setIsShowChatBox}
        setAction={setAction}
        action={action}
      />
      {isShowDetailForm ? (
        <OfficeDetailForm
          onClose={() => {
            setIsShowDetailForm(false);
          }}
          id={officeId}
          isOwner={isOwner}
        />
      ) : null}

      {action === "chatList" && (
        <ChatList
          onClose={() => setAction("")}
          id={+officeId}
          onSelectConversation={handleSelectConversation}
        />
      )}

      {action === "chatBox" && (
        <ChatBox
          conversationId={conversationId}
          onBack={() => setAction("chatList")}
          onClose={() => setAction("")}
          submitMessage={handleSubmitMessage}
        />
      )}

      {action === "member" && (
        <MemberList onClose={() => setAction("")} id={+officeId} />
      )}

      {action === "character" && (
        <CharacterForm onClose={() => setAction("")} />
      )}

      {action === "action" && (
        <InteractionMenu
          onGestureClick={(value: number) =>
            setCharacterGesture({ idx: value })
          }
          onEmojiClick={(value: number) => setCharacterEmoji({ idx: value })}
        />
      )}
    </>
  );
};

export default Workspace;

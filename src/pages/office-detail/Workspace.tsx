import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import OfficeDetailForm from "../../components/office-detail-form";
import MemberList from "../../components/office/member-list";
import OfficeCanvas from "../../components/office/OfficeCanvas";
import OfficeInterface from "../../components/office/OfficeInterface";
import { Item } from "../../services/api/offices/get-office-item/types";
import OfficeDetailProxy from "../../services/proxy/offices/office-detail";
import { useAppSelector } from "../../stores";
import { userSelectors } from "../../stores/auth-slice";
import { ProxyStatusEnum } from "../../types/http/proxy/ProxyStatus";
import CallingBar from "./calling/CallingBar";

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
  const [objectList, setObjectList] = useState<Item[]>([]);
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
    "action" | "character" | "config" | "member" | "setting" | ""
  >("");

  const navigate = useNavigate();

  const location = useLocation();

  const officeId = location.pathname.split("/")[2];

  const userInfo = useAppSelector(userSelectors.getUserInfo);

  const handleButtonRotateLeftClick = () => {
    selectedObject.rotation.y += Math.PI / 2;
  };

  const handleButtonRotateRightClick = () => {
    selectedObject.rotation.y -= Math.PI / 2;
  };

  const handleButtonDeleteClick = () => {
    const idx = objectList.findIndex((obj) => obj.id === selectedKey);
    const newObjectList = [...objectList];
    newObjectList.splice(idx, 1);
    navigate("/");
    setObjectList(newObjectList);
    setSelectedObject(null);
    setSelectedKey(null);
    setObjectActionVisible(false);
  };

  const handleItemInBottomMenuClick = (item: Item) => {
    setObjectList((objectList) => [...objectList, item]);
  };

  useEffect(() => {
    OfficeDetailProxy({ id: +officeId })
      .then((res) => {
        if (res.status === ProxyStatusEnum.FAIL) {
          return;
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          setIsOwner(res?.data?.office?.createdBy?.id === userInfo.id);
          if (res?.data?.office?.conversations.length > 0) {
            setConversationId(res?.data?.office?.conversations[0]?.id);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [officeId, userInfo.id]);

  return (
    <>
      {(action === "" || action === "member") && <CallingBar />}
      <OfficeCanvas
        setObjectionClickPos={setObjectionClickPos}
        characterGesture={characterGesture}
        characterEmoji={characterEmoji}
        isCustomizing={action !== ""}
        objectActionVisible={objectActionVisible}
        objectList={objectList}
        selectedObject={selectedObject}
        setObjectActionVisible={setObjectActionVisible}
        setSelectedKey={setSelectedKey}
        setSelectedObject={setSelectedObject}
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
          id={+officeId}
          isOwner={isOwner}
        />
      ) : null}

      {action === "member" && (
        <MemberList onClose={() => setAction("")} id={+officeId} />
      )}
    </>
  );
};

export default Workspace;

import {useContext, useEffect, useState, useCallback} from "react";
import {useLocation, useParams} from "react-router-dom";
import OfficeCanvas from "../../components/office/OfficeCanvas";
import OfficeDetailProxy from "../../services/proxy/offices/office-detail";
import {useAppSelector} from "../../stores";
import {userSelectors} from "../../stores/auth-slice";
import {Joystick} from 'react-joystick-component';
import CharacterContext from "../../context/CharacterContext";
import { socketSelector } from "../../stores/socket-slice";

export type positionType = {
    x: number;
    y: number;
};

const WorkspaceCustom = () => {
    const [objectList, setObjectList] = useState<Array<{
        key: string;
        code: string;
    }>>([]);
    const [selectedKey, setSelectedKey] = useState(null);
    const [selectedObject, setSelectedObject] = useState<any>(null);
    const [objectActionVisible, setObjectActionVisible] = useState(false);
    const [object3dClickPos, setObjectionClickPos] = useState<positionType>({
        x: 0,
        y: 0,
    });
    const [isCustomizing, setIsCustomizing] = useState(false);
    const [characterGesture, setCharacterGesture] = useState({idx: -1});
    const [characterEmoji, setCharacterEmoji] = useState({idx: -1});
    const characterCtx = useContext(CharacterContext);

    const params = useParams();

    const officeId = params.officeId;
    const userInfo = useAppSelector(userSelectors.getUserInfo);
    const socket = useAppSelector(socketSelector.getSocket);
    //
    // useEffect(() => {
    //     OfficeDetailProxy({id: officeId})
    //         .then((res) => {
    //             if (res.status === ProxyStatusEnum.FAIL) {
    //                 return;
    //             }
    //
    //             if (res.status === ProxyStatusEnum.SUCCESS) {
    //                 setIsOwner(res?.data?.office?.createdBy?.id === userInfo.id);
    //                 if (res?.data?.office?.conversations.length > 0) {
    //                     setConversationId(res?.data?.office?.conversations[0]?.id);
    //                 }
    //             }
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, [officeId, userInfo.id]);
    const handleObject3dDragged = useCallback((position, rotation) => {
        socket.emit("office_item:move", {
            id: selectedKey,
            transform: {
                xRotation: rotation.x,
                yRotation: rotation.y,
                zRotation: rotation.z,
                xPosition: position.x,
                yPosition: position.y,
                zPosition: position.z
            }
        })
    }, [selectedKey, socket]);
    
    const handleObject3dRotated = useCallback((position, rotation) => {
        socket.emit("office_item:move", {
            id: selectedKey,
            transform: {
                xRotation: rotation.x,
                yRotation: rotation.y,
                zRotation: rotation.z,
                xPosition: position.x,
                yPosition: position.y,
                zPosition: position.z
            }
        })
    }, [socket, selectedKey])

    return (
        <>
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
            <div style={{position: "absolute", bottom: 30, width: "100vw", display: "flex", justifyContent: "center"}}>
                <Joystick size={150} move={({x, y}) => {
                    x = x ? x / 75 : 0;
                    y = y ? y / 75 : 0;

                    const w = window as any;
                    w.moveVector = [x, 0, y];
                }} stop={() => {
                    const w = window as any;
                    w.moveVector = [0, 0, 0];
                }} baseColor="gray" stickColor="white"/>
            </div>
        </>
    );
};

export default WorkspaceCustom;

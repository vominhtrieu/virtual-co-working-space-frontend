/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from "three";
import { useCustomGLTF } from '../../helpers/utilities';
import { v4 } from "uuid";
import Peer from 'peerjs';
import { useAppSelector } from "../../stores";
import { socketSelector } from '../../stores/socket-slice';
import { matchPath } from 'react-router-dom';
import { userSelectors } from '../../stores/auth-slice';

export default function Model(props) {
  const group = useRef();
  const { nodes, materials } = useCustomGLTF('/models/TV.glb');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const socket = useAppSelector(socketSelector.getSocket);
  const userInfo = useAppSelector(userSelectors.getUserInfo);
  const match = matchPath({ path: "/office/:id" }, window.location.pathname);
  const [callerId, setCallerId] = useState("");
  const officeId = match?.params.id;
  const id = useMemo(() => v4(), []);
  const sharing = useRef(false);

  const myPeer = useMemo(
    () => {
      const p = new Peer(id, {
        host: process.env.REACT_APP_PEER_SERVER_HOST + "",
        port: +(process.env.REACT_APP_PEER_SERVER_PORT + ""),
        path: "/peer",
      });
      p.on("error", (err) => {
        console.log(err);
      })
      return p;
    }, []);

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.code === "Escape" && props.shareScreenVideoContainer.current && props.shareScreenVideoContainer.current.children.length > 1) {
        const node = props.shareScreenVideoContainer.current;
        node.removeChild(node.lastChild);
        node.style.display = "none";
      }
    })
  }, [])

  useEffect(() => {
    socket.on("calling:share-screen", (data) => {
      sharing.current = false;
      setTimeout(() => {
        navigator.mediaDevices.getUserMedia({
          video: {
            width: 1,
            height: 1,
          },
          audio: false,
        }).then((stream: MediaStream) => {
          const call = myPeer.call(data.callerId, stream);
          call.on("stream", (stream) => {
            setStream(stream);
          })
          call.on("close", () => "Closed")
        })
      }, 1000)
    })
    return () => {
      socket.removeAllListeners("calling:share-screen");
    }
  }, [socket, myPeer, callerId]);

  useEffect(() => {
    myPeer.on("call", (call) => {
      if (sharing.current) {
        return;
      }
      navigator.mediaDevices.getUserMedia({
        video: {
          width: 1,
          height: 1,
        },
        audio: false,
      }).then((stream: MediaStream) => {
        call.answer(stream);
        call.on("stream", (stream) => {
          setStream(stream);
        })
      });
    });
  })

  const shareScreen = () => {
    if (props.action === "config")
      return;
    navigator.mediaDevices.getDisplayMedia({
      video: {
        width: 1280,
        height: 720,
      },
      audio: false,
    }).then((stream: MediaStream) => {
      setStream(stream);
      sharing.current = true;
      socket.emit("calling:share-screen", {
        officeId: +(officeId + ""),
        callerId: myPeer.id,
      })
      myPeer.on("call", (call) => {
        const c = myPeer.call(call.peer, stream);
        c.on("stream", (stream) => {

        })
      });
    });
  }

  const videoTexture = useMemo(() => {
    if (!stream) {
      return null;
    }

    const selfVideo = document.createElement("video");
    selfVideo.muted = true;
    selfVideo.srcObject = stream;
    selfVideo.addEventListener("loadedmetadata", () => {
      selfVideo.play();
    });
    return new THREE.VideoTexture(selfVideo);
  }, [stream])
  if (videoTexture)
    materials.Material.map = videoTexture;

  const material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: videoTexture });
  return (
    <group ref={group} {...props}>
      <mesh geometry={nodes.Cube_1.geometry} material={materials.Border} />
      <mesh geometry={nodes.Cube_2.geometry} material={material} onDoubleClick={shareScreen} onClick={() => {
        if (!stream || !props.shareScreenVideoContainer.current) {
          return;
        }
        const selfVideo = document.createElement("video");
        selfVideo.style.width = "100vw";
        selfVideo.muted = true;
        selfVideo.srcObject = stream;
        selfVideo.addEventListener("loadedmetadata", () => {
          selfVideo.play();
        });
        props.shareScreenVideoContainer.current.style.display = "flex";
        props.shareScreenVideoContainer.current.appendChild(selfVideo);
      }} />
    </group>
  )
}
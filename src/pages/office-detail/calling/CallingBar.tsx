import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import Peer from "peerjs";
import "./_styles.scss";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../stores";
// import { connect } from "../../../stores/socket-slice";
import {socketSelector} from "../../../stores/socket-slice";
import {FaCamera, FaMicrophone} from "react-icons/fa";

export default function CallingBar() {
    const videoContainer = useRef<any>();
    const myVideo = useRef<any>();
    const [myStream, setMyStream] = useState<MediaStream | null>(null);
    const params = useParams();
    const socket = useAppSelector(socketSelector.getSocket);
    const [cameraEnabled, setCameraEnabled] = useState(true);
    const [microphoneEnabled, setMicrophoneEnabled] = useState(true);

    const myPeer = useMemo(() => new Peer(undefined, {
        host: process.env.REACT_APP_PEER_SERVER_HOST + "",
        port: +(process.env.REACT_APP_PEER_SERVER_PORT + ""),
        path: "/peer",
    }), []);
    const addVideoStream = useCallback((video: HTMLVideoElement, stream: MediaStream) => {
        video.srcObject = stream;
        const videoWrapper = document.createElement('div');
        videoWrapper.className = "video-container";
        videoWrapper.append(video);

        video.addEventListener('loadedmetadata', () => {
            video.play()
        });

        if (videoContainer.current) {
            videoContainer.current.append(videoWrapper);
        }
    }, []);

    // useEffect(() => {
    //     if (!socket) {
    //         dispatch(connect());
    //     }
    // }, [socket])

    useEffect(() => {
        myPeer.on("open", id => {
            socket.emit("calling:join", {
                officeId: params.id,
                peerId: id,
            });
        });

        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        }).then(stream => {
            setMyStream(stream);
            const streamMap = {};
            myPeer.on("call", call => {
                call.answer(stream);
                const video = document.createElement('video');
                call.on('stream', userVideoStream => {
                    if (streamMap[userVideoStream.id]) {
                        return;
                    }
                    streamMap[userVideoStream.id] = true;
                    addVideoStream(video, userVideoStream);
                });
            });
            if (myVideo.current) {
                myVideo.current.srcObject = stream;
            }
        })
    }, [myPeer, params.id]);

    useEffect(() => {
        if (!myStream || !myPeer) {
            return;
        }
        const streamMap = {};
        socket.on("calling:join", ({userId, peerId}) => {
            setTimeout(() => {
                const call = myPeer.call(peerId, myStream)
                const video = document.createElement('video')

                call.on('stream', userVideoStream => {
                    if (streamMap[userVideoStream.id]) {
                        return;
                    }
                    streamMap[userVideoStream.id] = true;
                    addVideoStream(video, userVideoStream)
                })
                call.on('close', () => {
                    video.remove()
                })
            }, 1000);
        });
        return () => {
            socket.removeListener("calling:join")
        }
    }, [addVideoStream, myPeer, myStream]);

    return (
        <div ref={videoContainer} className="calling-bar-container">
            {myStream && <div className="video-container">
                <video ref={myVideo} autoPlay muted/>
                <div className="video-button-container">
                    <button className={`video-button ${cameraEnabled ? "active" : ""}`} onClick={() => {
                        const vidTrack = myStream?.getVideoTracks();
                        vidTrack.forEach(track => track.enabled = !cameraEnabled);
                        setCameraEnabled(!cameraEnabled);
                    }
                    }>
                        <FaCamera fontSize={20}/>
                    </button>
                    <button className={`video-button ${microphoneEnabled ? "active" : ""}`} onClick={() => {
                        const vidTrack = myStream?.getAudioTracks();
                        vidTrack.forEach(track => track.enabled = !microphoneEnabled);
                        setMicrophoneEnabled(!microphoneEnabled);
                    }
                    }>
                        <FaMicrophone fontSize={20}/>
                    </button>
                </div>
            </div>}
        </div>
    )
}
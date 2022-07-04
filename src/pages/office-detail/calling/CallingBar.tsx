import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import Peer from "peerjs";
import "./_styles.scss";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../stores";
// import { connect } from "../../../stores/socket-slice";
import { socketSelector } from "../../../stores/socket-slice";
import { FaCamera, FaMicrophone } from "react-icons/fa";
import { v4 } from "uuid";

export default function CallingBar({
    myStream,
    setMyStream,
    setOtherStreams,
    userInfo,
    mobile,
}: any) {
    const videoContainer = useRef<any>();
    const myVideo = useRef<any>();
    const params = useParams();
    const socket = useAppSelector(socketSelector.getSocket);
    const [cameraEnabled, setCameraEnabled] = useState(true);
    const [microphoneEnabled, setMicrophoneEnabled] = useState(true);
    const myPeer = useMemo(
        () => {
            const p = new Peer(v4(), {
                host: process.env.REACT_APP_PEER_SERVER_HOST + "",
                port: +(process.env.REACT_APP_PEER_SERVER_PORT + ""),
                path: "/peer",
            });
            p.on("open", (id) => {
                socket.emit("calling:join", {
                    officeId: params.id,
                    peerId: id,
                });
            });

            return p;
        }, [userInfo.id, socket]
    );

    const addVideoStream = useCallback(
        (video: HTMLVideoElement, stream: MediaStream) => {
            video.srcObject = stream;
            const videoWrapper = document.createElement("div");
            videoWrapper.className = "video-container";
            videoWrapper.append(video);

            video.addEventListener("loadedmetadata", () => {
                video.play();
            });

            if (videoContainer.current) {
                videoContainer.current.append(videoWrapper);
            }
        },
        []
    );

    useEffect(() => {
        try {
            navigator.mediaDevices
                .getUserMedia({
                    video: {
                        width: 240,
                        height: 240,
                    },
                    audio: true,
                })
                .then((stream: any) => {
                    // stream.userId = userInfo.id;
                    setMyStream(stream);
                    const streamMap = {};

                    myPeer.on("call", (call) => {
                        call.answer(stream);
                        call.on("stream", (userVideoStream: any) => {
                            if (streamMap[userVideoStream.id]) {
                                return;
                            }
                            streamMap[userVideoStream.id] = true;
                            setOtherStreams((streams) => {
                                const temp = { ...streams };
                                temp[call.metadata.userId] = userVideoStream;
                                return temp;
                            })
                        });
                    });
                    if (myVideo.current) {
                        myVideo.current.srcObject = stream;
                    }
                }).catch(err => {
                    console.log(err)
                });
        } catch (err) {
            console.log("Calling error");
            console.log(err);
        }
    }, [myPeer, params.id]);

    useEffect(() => {
        if (!myStream || !myPeer) {
            return;
        }
        const streamMap = {};
        socket.on("calling:join", ({ userId, peerId }) => {
            setTimeout(() => {
                const call = myPeer.call(peerId, myStream, {
                    metadata: {
                        userId: userInfo.id,
                    }
                });

                call.on("stream", (userVideoStream: any) => {
                    if (streamMap[userVideoStream.id]) {
                        return;
                    }
                    streamMap[userVideoStream.id] = true;
                    setOtherStreams((streams) => {
                        const temp = { ...streams };
                        temp[userId] = userVideoStream;
                        return temp;
                    })
                });
                call.on("close", () => {
                    // video.remove();
                });
            }, 1000);
        });
        return () => {
            socket.removeListener("calling:join");
        };
    }, [addVideoStream, myPeer, myStream]);

    return <div className={`video-button-container ${mobile ? "mobile" : ""}`}>
        <button
            className={`video-button ${cameraEnabled ? "active" : ""}`}
            onClick={() => {
                const vidTrack = myStream?.getVideoTracks();
                vidTrack.forEach((track) => (track.enabled = !cameraEnabled));
                setCameraEnabled(!cameraEnabled);
            }}
        >
            <FaCamera fontSize={20} />
        </button>
        <button
            className={`video-button ${microphoneEnabled ? "active" : ""}`}
            onClick={() => {
                const vidTrack = myStream?.getAudioTracks();
                vidTrack.forEach(
                    (track) => (track.enabled = !microphoneEnabled)
                );
                setMicrophoneEnabled(!microphoneEnabled);
            }}
        >
            <FaMicrophone fontSize={20} />
        </button>
    </div >;
}

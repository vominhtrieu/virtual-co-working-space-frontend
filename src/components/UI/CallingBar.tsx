import React from "react";
import Peer from "peerjs";
import "./CallingBar.css";

export default function CallingBar() {
    const container = React.useRef(null);
    const [deviceAvailable, setDeviceAvailable] = React.useState(true);

    const addVideoStream = (video, stream) => {
        const roomItemContent = document.createElement("div");
        roomItemContent.className = "room-item-content";
        const roomItem = document.createElement("div");
        roomItem.className = "room-item";
        video.srcObject = stream;

        roomItemContent.appendChild(video);
        roomItem.appendChild(roomItemContent);
        // @ts-ignore
        container.current.appendChild(roomItem);

        video.addEventListener("loadedmetadata", () => {
            video.play();
        });
    };

    React.useEffect(() => {
        const peer = new Peer((+new Date()) + "", {host: "localhost", port: 5000});
        const participants = {};
        navigator.mediaDevices
            .getUserMedia({
                video: true,
                audio: true,
            })
            .then((stream) => {
                const selfVideo = document.createElement("video");
                selfVideo.muted = true;
                addVideoStream(selfVideo, stream);
            })
            .catch((err) => {
                setDeviceAvailable(false);
            });

        peer.on("call", (call) => {
            console.log(call);
            navigator.mediaDevices
                .getUserMedia({
                    video: true,
                    audio: true,
                })
                .then((stream) => {
                    call.answer(stream);
                    const video = document.createElement("video");
                    call.on("stream", (userStream) => {
                        if (participants[call.peer]) return;
                        participants[call.peer] = true;
                        addVideoStream(video, userStream);
                    });
                    call.on("close", () => {
                        // @ts-ignore
                        video.parentElement.parentElement.remove();
                    });
                });
        });

        // eslint-disable-next-line
    }, []);

    return <div ref={container} style={{
        position: "fixed",
        display: "flex",
        flexDirection: "row",
        top: 10,
        left: 0,
        width: "100%",
        justifyContent: "center", justifyItems: "center"
    }}>

    </div>
}
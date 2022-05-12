import { Modal } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../UI/button"

export default function OfficceCheckInModal ({open}) {
    const myVideo = useRef<any>(null);
    const photoRef = useRef<HTMLCanvasElement>(null);
    const [myStream, setMyStream] = useState<MediaStream | null>(null);
    const params = useParams();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
            setMyStream(stream);
            if (myVideo.current) {
                myVideo.current.srcObject = stream;
            }
        })
    }, [params.id])

    const onSubmitClick = () => {
        const width = 500;
        const height = width / (16/9);

        if (photoRef.current) {
            photoRef.current.width = width;
            photoRef.current.height = height;
    
            const context = photoRef.current?.getContext('2d');
            context?.drawImage(myVideo.current, 0, 0, width, height);
    
            const data = photoRef.current.toDataURL('image/jpeg');
            console.log(data);
        }
    }

    const footer = [
        <Button className="submit" variant="primary" onClick={onSubmitClick}>Check In</Button>
    ]

    return (
        <Modal visible={open} title="" footer={footer}>
            <p className="modal-title">Check in before entering the office</p>
            {myStream && <>
                <p>Smile &#128521;</p>
                <div className="camera-container">
                    <video className="camera-video" ref={myVideo} muted autoPlay />
                </div>
            </>}
            {!myStream && <p>Please open camera to complete your check-in</p>}
            <canvas ref={photoRef} />
        </Modal>
    )
}
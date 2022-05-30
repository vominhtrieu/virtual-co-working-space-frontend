import { Modal, Upload } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toastError, toastSuccess } from "../../../helpers/toast";
import IsCheckinProxy from "../../../services/proxy/checkin/checkin-today";
import CreateCheckinProxy from "../../../services/proxy/checkin/create-checkin";
import UploadProofProxy from "../../../services/proxy/checkin/upload-proof";
import { ProxyStatusEnum } from "../../../types/http/proxy/ProxyStatus";
import Button from "../../UI/button"

export default function OfficceCheckInModal () {
    const myVideo = useRef<any>(null);
    const photoRef = useRef<HTMLCanvasElement>(null);
    const [myStream, setMyStream] = useState<MediaStream | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const params = useParams();
    const photoData = useRef<any>(null);

    useEffect(() => {
        // IsCheckinProxy({ officeId: +params.id! }).then((res) => {
        //     console.log(res);
        //     if (res.status === ProxyStatusEnum.FAIL) {
        //         toastError(res.message ?? "Find check-in fail");
        //     }

        //     if (res.status === ProxyStatusEnum.SUCCESS) {
        //         const data = res.data
        //         if (Object.keys(data).length === 0 && data.constructor === Object) {
        //             setOpen(true);
        //         }
        //     }
        // })


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
    
            context?.canvas.toBlob((blob) => {
                const formData = new FormData();
                if (blob) {
                    formData.append("image", blob);
                }

                UploadProofProxy({ formData }).then((res) => {
                    if (res.status === ProxyStatusEnum.FAIL) {
                        toastError(res.message ?? "Upload photo failed")
                    }
    
                    if (res.status === ProxyStatusEnum.SUCCESS) {
                        if (res.data.url) {
                            CreateCheckinProxy({officeId: +params.id!, proof: res.data.url}).then((res) => {
                                if (res.status === ProxyStatusEnum.FAIL) {
                                    toastError(res.message ?? "Check in fail");
                                }

                                if (res.status === ProxyStatusEnum.SUCCESS) {
                                    toastSuccess("Check in successfully");
                                    setOpen(false);
                                }
                            })
                        }
                    }
                }).catch((err) => {
                    console.log(err);
                    toastError("Check in failed! Try again");
                });
            })
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
import { Modal, Spin } from "antd";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { toastError, toastSuccess } from "../../../helpers/toast";
import CreateCheckinProxy from "../../../services/proxy/checkin/create-checkin";
import UploadProofProxy from "../../../services/proxy/checkin/upload-proof";
import { useAppDispatch, useAppSelector } from "../../../stores";
import { loadSelectors } from "../../../stores/load-slice";
import { ProxyStatusEnum } from "../../../types/http/proxy/ProxyStatus";
import Button from "../../UI/button";

export default function OfficceCheckInModal() {
  const myVideo = useRef<HTMLVideoElement>(document.createElement("video"));
  const photoRef = useRef<HTMLCanvasElement>(null);
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const params = useParams();

  const isLoading = useAppSelector(loadSelectors.getIsLoad);
  const { t } = useTranslation();

  // useEffect(() => {
  //     dispatch(setIsLoad(true));
  //     IsCheckinProxy({ officeId: +params.id! }).then((res) => {
  //         if (res.status === ProxyStatusEnum.FAIL) {
  //             toastError(t(`error.${res.message}`) ?? "Find check-in fail");
  //         }

  //         if (res.status === ProxyStatusEnum.SUCCESS) {
  //             const data = res.data;
  //             if (Object.keys(data).length === 0 && data.constructor === Object) {
  //                 setOpen(true);

  //                 navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
  //                     setMyStream(stream);
  //                     if (myVideo.current) {
  //                         myVideo.current.srcObject = stream;
  //                     }
  //                 })
  //             }
  //         }

  //         dispatch(setIsLoad(false));
  //     })
  // }, [params.id])

  const onSubmitClick = () => {
    const width = 500;
    const height = width / (16 / 9);

    if (photoRef.current) {
      photoRef.current.width = width;
      photoRef.current.height = height;

      const context = photoRef.current?.getContext("2d");
      context?.drawImage(myVideo.current, 0, 0, width, height);

      context?.canvas.toBlob((blob) => {
        const formData = new FormData();
        if (blob) {
          formData.append("image", blob);
        }

        UploadProofProxy({ formData })
          .then((res) => {
            if (res.status === ProxyStatusEnum.FAIL) {
              toastError(t(`error.${res.message}`) ?? "Upload photo failed");
            }

            if (res.status === ProxyStatusEnum.SUCCESS) {
              if (res.data.url) {
                CreateCheckinProxy({
                  officeId: +params.id!,
                  proof: res.data.url,
                }).then((res) => {
                  if (res.status === ProxyStatusEnum.FAIL) {
                    toastError(t(`error.${res.message}`) ?? "Check in fail");
                  }

                  if (res.status === ProxyStatusEnum.SUCCESS) {
                    toastSuccess("Check in successfully");
                    setOpen(false);
                  }
                });
              }
            }
          })
          .catch((err) => {
            console.log(err);
            toastError("Check in failed! Try again");
          });
      });
    }
  };

  const footer = [
    <Button className="submit" variant="primary" onClick={onSubmitClick}>
      {isLoading ? <Spin /> : "Check In"}
    </Button>,
  ];

  return (
    <Modal visible={open} title="" footer={footer} closable={false}>
      <p className="modal-title">Check in before entering the office</p>
      {myStream && (
        <>
          <p>Smile &#128521;</p>
          <div className="camera-container">
            <video className="camera-video" ref={myVideo} autoPlay muted />
          </div>
        </>
      )}
      {!myStream && <p>Please open camera to complete your check-in</p>}
      <canvas ref={photoRef} />
    </Modal>
  );
}

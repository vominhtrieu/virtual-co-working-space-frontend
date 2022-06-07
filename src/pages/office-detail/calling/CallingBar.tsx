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

export default function CallingBar() {
  const videoContainer = useRef<any>();
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [microphoneEnabled, setMicrophoneEnabled] = useState(true);


  return (
    null
  );
}

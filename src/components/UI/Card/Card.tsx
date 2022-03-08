import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import "./Card.css";

import {
    BsFillCameraVideoFill,
} from "react-icons/bs";
import {
    AiTwotoneAudio,
} from "react-icons/ai";
const Card = () => {
    return (
        <div className='card-avatar'>
            <p>Name</p>
            <div className="avatar">
                <img src="" alt="" />
            </div>
            <div className='icon'>
                <AiTwotoneAudio />
                <BsFillCameraVideoFill />
            </div>
        </div>
    )
}

export default Card;
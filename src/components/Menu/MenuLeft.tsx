import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import "./MenuLeft.css";

import { BsFillChatFill } from "react-icons/bs";
import {
    RiUser3Fill,
    RiSettings4Fill,
} from "react-icons/ri";
function MenuLeft() {
    return (
        <div className="menu-left">
            <div className="top-left">
                <img src="" alt="" />
            </div>
            <div className="bottom-left">
                <div className="gg">
                    <BsFillChatFill />
                </div>
                <div className="fb">
                    <RiUser3Fill />
                </div>
                <div className="git">
                    <RiSettings4Fill />
                </div>
            </div>
        </div>
    )
}

export default MenuLeft;
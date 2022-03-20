import 'antd/dist/antd.css';

import { BsFillChatFill } from "react-icons/bs";
import {
    RiUser3Fill,
    RiSettings4Fill,
    RiLogoutBoxFill
} from "react-icons/ri";

import { useAppDispatch } from '../../../stores';
import { setAuthenticated } from '../../../stores/auth-slice';
import { removeAllDataLocal } from '../../../helpers/localStorage';
import { useNavigate } from 'react-router-dom';

const SlideBar = (props) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const showUser = () => {
        
    }

    const handleLogout = () =>{
        dispatch(setAuthenticated(false));
        removeAllDataLocal();
        navigate('/auth/login');
    }

    return (
        <div className="slide-bar">
            <div className="slide-bar__top-left">
                <img src="" alt="" />
            </div>
            <div className="slide-bar__bottom-left">
                <div className="chat">
                    <BsFillChatFill />
                </div>
                <div className="user">
                    <RiUser3Fill />
                </div>
                <div className="setting">
                    <RiSettings4Fill />
                </div>
                <div className="logout" onClick={handleLogout}>
                    <RiLogoutBoxFill />
                </div>
            </div>
        </div>
    )
}

export default SlideBar;
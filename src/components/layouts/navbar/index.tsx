import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import DarkLogo from "../../../assets/images/DarkLogo.png";
import {toastError, toastSuccess} from "../../../helpers/toast";
import {
    CreateOfficeFormValuesInterface,
    JoinOfficeFormValuesInterface,
} from "../../../pages/lobby/types";
import JoinByCodeProxy from "../../../services/proxy/office-invitation/join-invite-code";
import CreateOfficeProxy from "../../../services/proxy/offices/create-office";
import {useAppDispatch, useAppSelector} from "../../../stores";
import {officeSelectors, setIsOffice} from "../../../stores/office-slice";
import {ProxyStatusEnum} from "../../../types/http/proxy/ProxyStatus";
import UserPopup from "../user-popup";
import CreateOfficeForm from "./create-office-form";
import JoinOfficeForm from "./join-by-code";
import {NavbarProps} from "./types";

const Navbar = (props: NavbarProps) => {
    const {onInsertOffice} = props;
    const navigate = useNavigate();
    const [isJoinOffice, setIsJoinOffice] = useState(false);
    const [isCreateOffice, setIsCreateOffice] = useState(false);
    const isOffice = useAppSelector(officeSelectors.getIsOffice);
    const dispatch = useAppDispatch();

    const location = useLocation();

    return (
        <>
            <nav className="navbar">
                <div className="navbar__brand">
                    <img src={DarkLogo} alt="" className="navbar__logo_img" onClick={() => navigate("/lobby")}/>
                    <h1>iSpace</h1>
                </div>
                <div className="navbar__right-content">
                    <UserPopup/>
                </div>
            </nav>
        </>
    );
};

export default Navbar;

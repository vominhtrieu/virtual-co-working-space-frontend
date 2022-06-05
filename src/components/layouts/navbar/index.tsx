import { useNavigate } from "react-router-dom";
import DarkLogo from "../../../assets/images/DarkLogo.png";
import UserPopup from "../user-popup";
import { NavbarProps } from "./types";

const Navbar = (props: NavbarProps) => {
    const navigate = useNavigate();

    return (
        <>
            <nav className="navbar">
                <div className="navbar__brand" onClick={() => navigate("/lobby")}>
                    <img src={DarkLogo} alt="" className="navbar__logo_img" />
                    <h1>iSpace</h1>
                </div>
                <div className="navbar__right-content">
                    <UserPopup />
                </div>
            </nav>
        </>
    );
};

export default Navbar;

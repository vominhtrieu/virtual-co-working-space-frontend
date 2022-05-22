import {
  FaCog,
  FaGrin,
  FaTools,
  FaTshirt,
  FaUserFriends,
} from "react-icons/fa";
import { OfficeBarPropsInterface } from "./types";

const OfficeBar = (props: OfficeBarPropsInterface) => {
  const { action, setAction, isOwner } = props;

  return (
    <nav className="office-bar">
      <div className="office-bar__name">Phòng IT</div>

      <div className="office-bar__right-content">
        <div
          className={`office-bar__icon-btn + ${
            action === "action" ? "active" : ""
          }`}
          onClick={() => {
            if (action === "action") return setAction("");
            setAction("action");
          }}
        >
          <FaGrin className="office-bar__icon" />
        </div>
        <div
          className={`office-bar__icon-btn + ${
            action === "character" ? "active" : ""
          }`}
          onClick={() => {
            if (action === "character") return setAction("");
            setAction("character");
          }}
        >
          <FaTshirt className="office-bar__icon" />
        </div>
        <div
          className={`office-bar__icon-btn + ${
            action === "config" ? "active" : ""
          }`}
          onClick={() => {
            if (action === "config") return setAction("");
            setAction("config");
          }}
        >
          <FaTools className="office-bar__icon" />
        </div>
        <div
          className={`office-bar__icon-btn + ${
            action === "member" ? "active" : ""
          }`}
          onClick={() => {
            if (action === "member") return setAction("");
            setAction("member");
          }}
        >
          <FaUserFriends className="office-bar__icon" />
        </div>
        {isOwner && (
          <div
            className={`office-bar__icon-btn + ${
              action === "setting" ? "active" : ""
            }`}
            onClick={() => {
              if (action === "setting") return setAction("");
              setAction("setting");
            }}
          >
            <FaCog className="office-bar__icon" />
          </div>
        )}
      </div>
    </nav>
  );
};

export default OfficeBar;

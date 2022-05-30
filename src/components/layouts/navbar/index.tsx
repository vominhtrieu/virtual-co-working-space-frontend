import { useState } from "react";
import { FaDoorClosed, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import LogoVSpace from "../../../assets/images/VSpaceLogo.svg";
import { toastError, toastSuccess } from "../../../helpers/toast";
import {
  CreateOfficeFormValuesInterface,
  JoinOfficeFormValuesInterface,
} from "../../../pages/lobby/types";
import JoinByCodeProxy from "../../../services/proxy/office-invitation/join-invite-code";
import CreateOfficeProxy from "../../../services/proxy/offices/create-office";
import { useAppDispatch, useAppSelector } from "../../../stores";
import { userSelectors } from "../../../stores/auth-slice";
import { loadSelectors } from "../../../stores/load-slice";
import { officeSelectors, setIsOffice } from "../../../stores/office-slice";
import { ProxyStatusEnum } from "../../../types/http/proxy/ProxyStatus";
import { OfficeInterface } from "../../../types/office";
import NewButton from "../../UI/new-button";
import UserPopup from "../user-popup";
import CreateOfficeForm from "./create-office-form";
import JoinOfficeForm from "./join-by-code";
import { NavbarProps } from "./types";

const Navbar = (props: NavbarProps) => {
  const { onInsertOffice } = props;
  const navigate = useNavigate();
  const [isJoinOffice, setIsJoinOffice] = useState(false);
  const [isCreateOffice, setIsCreateOffice] = useState(false);
  const isOffice = useAppSelector(officeSelectors.getIsOffice);
  const isLoading = useAppSelector(loadSelectors.getIsLoad);
  const dispatch = useAppDispatch();

  const handleCreateOfficeSubmit = (
    values: CreateOfficeFormValuesInterface
  ) => {
    CreateOfficeProxy(values)
      .then((res) => {
        if (res.status === ProxyStatusEnum.FAIL) {
          toastError(res.message ?? "Create office fail");
          return;
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          setIsCreateOffice(false);
          toastSuccess("Create office success");
          onInsertOffice && onInsertOffice();
          dispatch(setIsOffice(!isOffice));
          return;
        }
      })
      .catch((err) => {
        toastError(err.message ?? "Create office fail");
      });
  };

  const handleJoinOfficeSubmit = (values: JoinOfficeFormValuesInterface) => {
    JoinByCodeProxy(values)
      .then((res) => {
        if (res.status === ProxyStatusEnum.FAIL) {
          toastError(res.message ?? "Join office fail");
          return;
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          setIsJoinOffice(false);
          toastSuccess("Join office success");
          onInsertOffice && onInsertOffice();
          dispatch(setIsOffice(!isOffice));
          return;
        }
      })
      .catch((err) => {
        toastError(err.message ?? "Join office fail");
      });
  };

  return (
    <>
      {isCreateOffice ? (
        <CreateOfficeForm
          onClose={() => {
            setIsCreateOffice(false);
          }}
          onSubmit={handleCreateOfficeSubmit}
        />
      ) : null}

      {isJoinOffice ? (
        <JoinOfficeForm
          onClose={() => {
            setIsJoinOffice(false);
          }}
          onSubmit={handleJoinOfficeSubmit}
        />
      ) : null}

      <nav className="navbar">
        <div className="navbar__logo" onClick={() => navigate("/lobby")}>
          <img src={LogoVSpace} alt="" className="navbar__logo-img" />
        </div>
        <div className="navbar__right-content">
          <div className="navbar__button">
            <NewButton
              variant="primary"
              content="Tạo phòng"
              icon={<FaPlus />}
              onClick={() => setIsCreateOffice(true)}
            />
          </div>

          <div className="navbar__button">
            <NewButton
              variant="primary"
              content="Tham gia phòng"
              icon={<FaDoorClosed />}
              onClick={() => setIsJoinOffice(true)}
            />
          </div>
          <UserPopup />
        </div>
      </nav>
    </>
  );
};

export default Navbar;

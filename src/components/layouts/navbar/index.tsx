import { FaDoorClosed, FaPlus } from "react-icons/fa";
import NewButton from "../../UI/new-button";
import LogoVSpace from "../../../assets/images/VSpaceLogo.svg";
import UserPopup from "../user-popup";
import { useNavigate } from "react-router-dom";
import {useState } from "react";
import { toastError, toastSuccess } from "../../../helpers/toast";
import CreateOfficeProxy from "../../../services/proxy/offices/create-office";
import JoinByCodeProxy from "../../../services/proxy/office-invitation/join-invite-code";
import { useAppSelector } from "../../../stores";
import { userSelectors } from "../../../stores/auth-slice";
import { ProxyStatusEnum } from "../../../types/http/proxy/ProxyStatus";
import { OfficeInterface } from "../../../types/office";
import CreateOfficeForm from "./create-office-form";
import JoinOfficeForm from "./join-by-code";
import { CreateOfficeFormValuesInterface, JoinOfficeFormValuesInterface } from "../../../pages/lobby/types";
import { useAppDispatch } from "../../../stores";
import { setIsOffice } from "../../../stores/office-slice";
import { officeSelectors } from "../../../stores/office-slice";
import { loadSelectors } from "../../../stores/load-slice";
import { Skeleton } from 'antd';
import SkeletonInput from "antd/lib/skeleton/Input";

const Navbar = () => {
  const navigate = useNavigate();
  const [officeList, setOfficeList] = useState<OfficeInterface[]>();
  const [countGetOffices, setCountGetOffices] = useState(0);
  const [isJoinOffice, setIsJoinOffice] = useState(false);
  const [isCreateOffice, setIsCreateOffice] = useState(false);
  const isOffice = useAppSelector(officeSelectors.getIsOffice);
  const isLoading = useAppSelector(loadSelectors.getIsLoad);
  const dispatch = useAppDispatch();
  const arrThumnail: number[] = new Array(0, 1, 2, 3, 4, 5);

  const userInfo = useAppSelector(userSelectors.getUserInfo);

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
          setCountGetOffices((curr) => curr + 1);
          dispatch(setIsOffice(!isOffice));
          return;
        }
      })
      .catch((err) => {
        toastError(err.message ?? "Create office fail");
      });
  };

  const handleJoinOfficeSubmit = (
    values: JoinOfficeFormValuesInterface
  ) => {
    JoinByCodeProxy(values)
      .then((res) => {
        
        if (res.status === ProxyStatusEnum.FAIL) {
          toastError(res.message ?? "Join office fail");
          return;
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          setIsJoinOffice(false);
          toastSuccess("Join office success");
          setCountGetOffices((curr) => curr + 1);
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

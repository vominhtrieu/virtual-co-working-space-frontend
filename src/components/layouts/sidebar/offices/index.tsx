import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../../../../helpers/toast";
import CreateOfficeProxy from "../../../../services/proxy/offices/create-office";
import GetOfficeListProxy from "../../../../services/proxy/offices/office-list";
import JoinByCodeProxy from "../../../../services/proxy/office-invitation/join-invite-code";
import { useAppSelector } from "../../../../stores";
import { userSelectors } from "../../../../stores/auth-slice";
import { ProxyStatusEnum } from "../../../../types/http/proxy/ProxyStatus";
import { OfficeInterface } from "../../../../types/office";
import Button from "../../../UI/button";
import Thumbnail from "../../../UI/thumbnail";
import SidebarBox from "../sidebar-box";
import CreateOfficeForm from "./create-office-form";
import JoinOfficeForm from "./join-by-code";
import {
  CreateOfficeFormValuesInterface,
  JoinOfficeFormValuesInterface,
} from "../../../../pages/lobby/types";
import { useAppDispatch } from "../../../../stores";
import { setIsOffice } from "../../../../stores/office-slice";
import { officeSelectors } from "../../../../stores/office-slice";
import { loadSelectors } from "../../../../stores/load-slice";
import { Skeleton } from "antd";
import { useTranslation } from "react-i18next";

const Offices = () => {
  const [officeList, setOfficeList] = useState<OfficeInterface[]>();
  const [countGetOffices, setCountGetOffices] = useState(0);
  const [isJoinOffice, setIsJoinOffice] = useState(false);
  const [isCreateOffice, setIsCreateOffice] = useState(false);
  const isOffice = useAppSelector(officeSelectors.getIsOffice);
  const isLoading = useAppSelector(loadSelectors.getIsLoad);
  const dispatch = useAppDispatch();
  const arrThumnail: number[] = new Array(0, 1, 2, 3, 4, 5);

  const userInfo = useAppSelector(userSelectors.getUserInfo);
  const { id: userId } = userInfo;

  const { t } = useTranslation();

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    GetOfficeListProxy({ page: 1, size: 5 })
      .then((res) => {
        if (!isMounted) return;

        if (res.status === ProxyStatusEnum.FAIL) {
          toastError(
            t(`error.${res.message}`) ?? "Get offices fail"
          );
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          setOfficeList(res.data.officeList);
        }
      })
      .catch((err) => {
        toastError(
          t(`error.${err.message}`) ?? "Get offices fail"
        );
      });

    return () => {
      isMounted = false;
    };
  }, [userId, isOffice, countGetOffices]);

  const handleCreateOfficeSubmit = (
    values: CreateOfficeFormValuesInterface
  ) => {
    CreateOfficeProxy(values)
      .then((res) => {
        if (res.status === ProxyStatusEnum.FAIL) {
          toastError(
            t(`error.${res.message}`) ?? "Create office fail"
          );
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
        toastError(
          t(`error.${err.message}`) ?? "Create office fail"
        );
      });
  };

  const handleJoinOfficeSubmit = (values: JoinOfficeFormValuesInterface) => {
    JoinByCodeProxy(values)
      .then((res) => {
        if (res.status === ProxyStatusEnum.FAIL) {
          toastError(t(`error.${res.message}`) ?? "Join office fail");
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
        toastError(
          t(`error.${err.message}`) ?? "Join office fail"
        );
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

      <SidebarBox>
        <div className="sidebar-offices">
          <div className="sidebar-offices__title">Offices</div>

          <div className="sidebar-offices__container">
            {/* box content - start */}
            <div className="sidebar-offices__group">
              <div className="sidebar-offices__items">
                {isLoading
                  ? arrThumnail?.map((item) => (
                      <div className="thumbnail-sketalon">
                        <Skeleton.Image className="thumbnail__img" />
                        <Skeleton
                          paragraph={{ rows: 0, width: 100 }}
                          className="thumbnail__content"
                        />
                      </div>
                    ))
                  : officeList?.map((office, key) => {
                      return (
                        <Thumbnail
                          office={office}
                          key={key}
                          src={office.avatarUrl}
                          onClick={() => {
                            navigate(`/office/${office.id}`, {
                              state: {
                                officeId: office.id,
                              },
                            });
                          }}
                        />
                      );
                    })}
              </div>
            </div>
            {/* box content - end */}
            <div className="sidebar-offices__group-btn">
              <Button
                variant="primary"
                onClick={() => {
                  setIsCreateOffice(true);
                }}
              >
                Tạo phòng
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setIsJoinOffice(true);
                }}
              >
                Tham gia phòng
              </Button>
            </div>
          </div>
        </div>
      </SidebarBox>
    </>
  );
};

export default Offices;

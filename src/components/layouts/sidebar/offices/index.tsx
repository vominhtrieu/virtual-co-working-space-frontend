import { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../../../../helpers/toast";
import CreateOfficeProxy from "../../../../services/proxy/offices/create-office";
import GetOfficeListProxy from "../../../../services/proxy/offices/office-list";
import { useAppSelector } from "../../../../stores";
import { userSelectors } from "../../../../stores/auth-slice";
import { ProxyStatusEnum } from "../../../../types/http/proxy/ProxyStatus";
import { OfficeInterface } from "../../../../types/office";
import Thumbnail from "../../../UI/thumbnail";
import SidebarBox from "../sidebarBox";
import CreateOfficeForm from "./createOfficeForm";
import { CreateOfficeFormValuesInterface } from "./types";

const Offices = () => {
  const [officeList, setOfficeList] = useState<OfficeInterface[]>();
  const [isCreateOffice, setIsCreateOffice] = useState(false);

  const userInfo = useAppSelector(userSelectors.getUserInfo);
  const { id: userId } = userInfo;

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    GetOfficeListProxy({ page: 1, size: 5 })
      .then((res) => {
        if (!isMounted) return;

        if (res.status === ProxyStatusEnum.FAIL) {
          toastError(res.message ?? "Get offices fail");
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          setOfficeList(res.data.officeList);
        }
      })
      .catch((err) => {
        toastError(err.message ?? "Get offices fail");
      });

    return () => {
      isMounted = false;
    };
  }, [userId]);

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
          return;
        }
      })
      .catch((err) => {
        toastError(err.message ?? "Create office fail");
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
      <SidebarBox>
        <div className='sidebar-offices'>
          <div className='sidebar-offices__title'>Offices</div>
          <div className='sidebar-offices__container'>
            {/* box content - start */}
            <div className='sidebar-offices__group'>
              <div className='sidebar-offices__group-header'>
                <div className='sidebar-offices__header-title'>Created</div>
                <IoMdAddCircleOutline
                  className='sidebar-offices__header-icon'
                  onClick={() => setIsCreateOffice(true)}
                />
              </div>
              <div className='sidebar-offices__items'>
                {officeList?.map((office, key) => {
                  return (
                    <Thumbnail
                      title={office.name}
                      key={key}
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
          </div>
        </div>
      </SidebarBox>
    </>
  );
};

export default Offices;

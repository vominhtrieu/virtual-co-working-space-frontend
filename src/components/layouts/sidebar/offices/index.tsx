import { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdMeetingRoom } from "react-icons/md";
import { toastError } from "../../../../helpers/toast";
import GetOfficeListProxy from "../../../../services/proxy/offices/office-list";
import { ProxyStatusEnum } from "../../../../types/http/proxy/ProxyStatus";
import { OfficeInterface } from "../../../../types/office";
import SidebarBox from "../sidebarBox";
import CreateOfficeForm from "./createOfficeForm";

const Offices = () => {
  const [officeJoinedList, setOfficeJoinedList] = useState<OfficeInterface[]>();
  const [isCreateOffice, setIsCreateOffice] = useState(false);

  useEffect(() => {
    let isMounted = true;
    GetOfficeListProxy({ page: 1, size: 5 })
      .then((res) => {
        if (!isMounted) return;

        if (res.status === ProxyStatusEnum.FAIL) {
          toastError(res.message ?? "Login fail");
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          setOfficeJoinedList(res.data.officeList ?? []);
        }
      })
      .catch((err) => {
        toastError(err.message ?? "Login fail");
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleCreateOfficeSubmit = (values) => {
    console.log(values);
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
              <ul className='sidebar-offices__items'>
                {officeJoinedList?.map((office, key) => {
                  return (
                    <li className='sidebar-offices__item' key={key}>
                      <MdMeetingRoom className='sidebar-offices__item-icon' />
                      <div className='sidebar-offices__item-text'>
                        {office.name}
                      </div>
                    </li>
                  );
                })}
                {/* office item - start */}
                <li className='sidebar-offices__item'>
                  <MdMeetingRoom className='sidebar-offices__item-icon' />
                  <div className='sidebar-offices__item-text'>Team IT</div>
                </li>
                {/* office item - end */}
                {/* office item - start */}
                <li className='sidebar-offices__item'>
                  <MdMeetingRoom className='sidebar-offices__item-icon' />
                  <div className='sidebar-offices__item-text'>Team IT</div>
                </li>
                {/* office item - end */}
                {/* office item - start */}
                <li className='sidebar-offices__item'>
                  <MdMeetingRoom className='sidebar-offices__item-icon' />
                  <div className='sidebar-offices__item-text'>Team IT</div>
                </li>
                {/* office item - end */}
                {/* office item - start */}
                <li className='sidebar-offices__item'>
                  <MdMeetingRoom className='sidebar-offices__item-icon' />
                  <div className='sidebar-offices__item-text'>Team IT</div>
                </li>
                {/* office item - end */}
              </ul>
            </div>
            {/* box content - end */}
            <div className='sidebar-offices__bar-line' />
            {/* box content - start */}
            <div className='sidebar-offices__group'>
              <div className='sidebar-offices__group-header'>
                <div className='sidebar-offices__header-title'>Joined</div>
                <IoMdAddCircleOutline className='sidebar-offices__header-icon' />
              </div>
              <ul className='sidebar-offices__items'>
                {/* office item - start */}
                <li className='sidebar-offices__item'>
                  <MdMeetingRoom className='sidebar-offices__item-icon' />
                  <div className='sidebar-offices__item-text'>Team IT</div>
                </li>
                {/* office item - end */}
                {/* office item - start */}
                <li className='sidebar-offices__item'>
                  <MdMeetingRoom className='sidebar-offices__item-icon' />
                  <div className='sidebar-offices__item-text'>Team IT</div>
                </li>
                {/* office item - end */}
                {/* office item - start */}
                <li className='sidebar-offices__item'>
                  <MdMeetingRoom className='sidebar-offices__item-icon' />
                  <div className='sidebar-offices__item-text'>Team IT</div>
                </li>
                {/* office item - end */}
                {/* office item - start */}
                <li className='sidebar-offices__item'>
                  <MdMeetingRoom className='sidebar-offices__item-icon' />
                  <div className='sidebar-offices__item-text'>Team IT</div>
                </li>
                {/* office item - end */}
              </ul>
            </div>
            {/* box content - end */}
          </div>
        </div>
      </SidebarBox>
    </>
  );
};

export default Offices;

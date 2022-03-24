import { IoMdAddCircleOutline } from "react-icons/io";
import { MdMeetingRoom } from "react-icons/md";
import SidebarBox from "../sidebarBox";

const Offices = () => {
  return (
    <SidebarBox>
      <div className='sidebar-offices'>
        <div className='sidebar-offices__title'>Offices</div>
        {/* box content - start */}
        <div className='sidebar-offices__group'>
          <div className='sidebar-offices__group-header'>
            <div className='sidebar-offices__header-title'>Created</div>
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
    </SidebarBox>
  );
};

export default Offices;

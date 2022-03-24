import { BsFillChatFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { RiSettings4Fill } from "react-icons/ri";

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar__logo'>VW</div>

      <div className='sidebar__menu'>
        <ul className='sidebar__items'>
          <li className='sidebar__item'>
            <BsFillChatFill className='sidebar__icon' />
          </li>
          <li className='sidebar__item'>
            <FaUserAlt className='sidebar__icon' />
          </li>
          <li className='sidebar__item'>
            <RiSettings4Fill className='sidebar__icon' />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

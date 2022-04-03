import SidebarBox from "../sidebarBox";

const SidebarChat = () => {
  return (
    <SidebarBox>
      <div className='sidebar-chat'>
        <div className='sidebar-chat__title'>Chat</div>
        {/* block - start */}
        <div className='sidebar-chat__block'>
          <div className='sidebar-chat__block-title'>Âm lượng</div>
          <div className='sidebar-chat__block-content'></div>
        </div>
        {/* block - end */}
      </div>
    </SidebarBox>
  );
};

export default SidebarChat;

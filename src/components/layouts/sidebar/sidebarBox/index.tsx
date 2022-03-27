import { SidebarBoxProps } from "./types";

const SidebarBox = (props: SidebarBoxProps) => {
  const { children } = props;
  return <div className='sidebar-box'>{children}</div>;
};

export default SidebarBox;

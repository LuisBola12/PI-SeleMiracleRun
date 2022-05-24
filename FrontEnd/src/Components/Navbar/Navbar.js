import { useSelector } from "react-redux";
import {
  Nav,
  NavLink,
  NavMenu,
} from "./NavbarElements";
import DropdownMenu, { Sidebar } from "../SideBar/Sidebar.js";
import { ReactComponent as ListIcon } from '../SideBar/icons/list.svg';
import './Navbar.css'


const Navbar = () => {
  // const { activeProject } = useContext(ProjectContext);
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const user = useSelector((state) => state.user.user);

  return (
    <>
      <div>
        <Nav>
          <div className="navBar-logo"></div>
          <NavMenu>
            <NavLink to="/benefits" activestyle='true'>
              Benefits
            </NavLink>
            <NavLink to="/employees" activestyle='true'>
              Employees
            </NavLink>
            <NavLink to="/volDeductions" activestyle='true'>
              Voluntary Deductions
            </NavLink>
          </NavMenu>
          <div className="navbar-project-user">
            <div className="activeProject">{activeProject}</div>
            <div className="activeUser">{user.Email.charAt(0).toLocaleUpperCase()}</div>
          </div>
          <Sidebar icon={<ListIcon />}>
            <DropdownMenu></DropdownMenu>
          </Sidebar>
        </Nav>
        
      </div>
    </>
  );
};

export default Navbar;

import React from "react";
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
            {user.Roles === 'admin' &&
              <>
                <NavLink to="/employees" activestyle='true'>
                  Employees
                </NavLink>
                <NavLink to="/benefits" activestyle='true'>
                  Benefits
                </NavLink>
                <NavLink to="/volDeductions" activestyle='true'>
                  Voluntary Deductions
                </NavLink>
              </>
            }
            {user.Roles === 'emp' &&
              <>
                <NavLink to="/ee" activestyle='true'>
                  My Payments
                </NavLink>
                <NavLink to="/myBenefits" activestyle='true'>
                  My Benefits
                </NavLink>
                <NavLink to="/ee" activestyle='true'>
                  My Voluntary Deductions
                </NavLink>
              </>
            }
          </NavMenu>
          <div className="navbar-corner">
            <div className="navbar-project-user">
              <div className="activeProject">{activeProject}</div>
              <div className="activeUser">{user.Email.charAt(0).toLocaleUpperCase()}</div>
            </div>
            <Sidebar icon={<ListIcon />}>
              <DropdownMenu></DropdownMenu>
            </Sidebar>
          </div>

        </Nav>

      </div>
    </>
  );
};

export default Navbar;

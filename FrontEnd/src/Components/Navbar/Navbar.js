import React, { useContext } from "react";
import {
  Nav,
  NavLink,
  NavMenu,
} from "./NavbarElements";
import logo from "./logo.png";
import DropdownMenu, { Sidebar } from "../SideBar/Sidebar.js";
import { ReactComponent as ListIcon } from '../SideBar/icons/list.svg';
import './Navbar.css'
import { useSelector } from "react-redux";


const Navbar = () => {
  // const { activeProject } = useContext(ProjectContext);
  const activeProject = useSelector((state) => state.activeProject.projectName);

  return (
    <>
      <Nav>
        <div className="nav-header">
          <img src={logo} alt="logo" className="logo-img" />
          <label className="navbar-activeProject">{activeProject}</label>
        </div>

        <NavMenu>

          <NavLink to="/home" activestyle='true'>
            Home
          </NavLink>
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

        <Sidebar icon={<ListIcon />}>
          <DropdownMenu></DropdownMenu>
        </Sidebar>
      </Nav>
    </>
  );
};

export default Navbar;

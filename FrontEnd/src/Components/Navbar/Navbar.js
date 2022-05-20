import React, { useContext } from "react";
import {
  Nav,
  NavLink,
  NavMenu,
} from "./NavbarElements";
import logo from "./logo.png";
import DropdownMenu, { Sidebar } from "../SideBar/Sidebar.js";
import { ReactComponent as ListIcon } from '../SideBar/icons/list.svg';
import ProjectContext from "../../Contexts/ProjectContext";
import './Navbar.css'

const Navbar = () => {
  const { activeProject } = useContext(ProjectContext);

  return (
    <>
      <Nav>
        <img src={logo} alt="logo" />
        <NavMenu>
          <label className="navbar-activeProject">{activeProject}</label>

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

import React from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
} from "./NavbarElements";
import logo from "./logo.png";
import DropdownMenu, {Sidebar} from "../SideBar/Sidebar";
import { ReactComponent as ListIcon } from '../SideBar/icons/list.svg';
const Navbar = () => {
  return (
    <>
      <Nav>
        <img src={logo} alt="logo" />
        <Bars />
        <NavMenu>
          <NavLink to="/home" activestyle = 'true'>
            Home
          </NavLink>
          <NavLink to="/benefits" activestyle = 'true'>
            Benefits
          </NavLink>
          <NavLink to="/employees" activestyle = 'true'>
            Employees
          </NavLink>
          <NavLink to="/volDeductions" activestyle = 'true'>
            Voluntary Deductions
          </NavLink>
        </NavMenu>
        <Sidebar icon = {<ListIcon/>}>
          <DropdownMenu></DropdownMenu>
        </Sidebar>
        {/* <NavBtn>
          <NavBtnLink to='/signin'>Sign In</NavBtnLink>
        </NavBtn> */}
      </Nav>
    </>
  );
};

export default Navbar;

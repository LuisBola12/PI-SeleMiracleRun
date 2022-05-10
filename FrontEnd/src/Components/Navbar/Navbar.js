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
          <NavLink to="/home" activeStyle>
            Home
          </NavLink>
          <NavLink to="/benefits" activeStyle>
            Benefits
          </NavLink>
          <NavLink to="/employees" activeStyle>
            Employees
          </NavLink>
          <NavLink to="/volDeductions" activeStyle>
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

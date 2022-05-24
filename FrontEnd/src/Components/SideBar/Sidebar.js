import './Sidebar.css';
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Navigate, useNavigate} from "react-router-dom";
import {logout} from "../../Slices/user/userSlice";

export const Sidebar = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <li className="sidebar-component">
      <a href='#' className="sidebar-dropdown-icon" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>
      {open && props.children}
    </li>
  );
}

const DropdownMenu = () => {
  let navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('main1');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const redirectToProjectSelecion = () => {
    navigate('/');
  }

  const activeProject = useSelector((state) => state.activeProject.projectName);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  }, [])

  function calcHeight(el) {
    const height = el.offsetHeight

    setMenuHeight(height);
  }

  let navigateLogin = useNavigate();
  const redirectToLogIn = () => {
    dispatch(logout())
    navigateLogin("/login");
  }

  // function DropdownItem(props) {
  //   return (
  //     <button onClick={redirectToProjectSelecion} className="sidebar-button" >
  //       {props.children}
  //     </button>
  //   );
  // }
  return (
    <div className="sidebar-dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === 'main1'}
        timeout={500}
        unmountOnExit
        onEnter={calcHeight}>
        <div className="sidebar-menu">
            <button onClick={redirectToProjectSelecion} className="sidebar-button" >
              Projects
          </button>
            <button onClick={redirectToLogIn} className="sidebar-button" >
              Sign Out
            </button>
            
        </div>
      </CSSTransition >
    </div >
  );
}
export default DropdownMenu;
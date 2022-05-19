import './Sidebar.css';
import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useNavigate } from 'react-router-dom';


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
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('main1');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  const redirectToHome = () => {
    navigate('/ProjectAdmin');
  }

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  }, [])

  function calcHeight(el) {
    const height = el.offsetHeight

    setMenuHeight(height);
  }
  function DropdownItem(props) {
    const navigate = useNavigate();

    return (
      <button onClick={redirectToHome} className="sidebar-button" >
        {props.children}
      </button>
    );
  }

  return (
    <div className="sidebar-dropdown" style={{ height: menuHeight }} ref={dropdownRef}>

      <CSSTransition
        in={activeMenu === 'main1'}
        timeout={500}
        unmountOnExit
        onEnter={calcHeight}>
        <div className="sidebar-menu">

          <button onClick={redirectToHome} className="sidebar-button" >
            Projects
          </button>
          <button onClick={redirectToHome} className="sidebar-button" >
            Settings
          </button>
        </div>
      </CSSTransition >


    </div >
  );
}
export default DropdownMenu;
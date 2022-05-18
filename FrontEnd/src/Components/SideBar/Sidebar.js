import './style.css';


import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';


export const Sidebar = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav1-item1">
      <a href="#" className="menu1-button1" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>
      {open && props.children}
    </li>
  );
}

const DropdownMenu = () => {
  const [activeMenu, setActiveMenu] = useState('main1');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  }, [])

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }
  function DropdownItem(props) {
    return (
      <a href={props.url} className="menu1-item1" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon1-button1"></span>
        {props.children}
        <span className="icon1-right1"></span>
      </a>
    );
  }

  return (
    <div className="dropdown1" style={{ height: menuHeight }} ref={dropdownRef}>

      <CSSTransition
        in={activeMenu === 'main1'}
        timeout={500}
        classNames="menu1-primary1"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu1">

          <DropdownItem url='/projectAdmin'>
            Projects
          </DropdownItem>

          <DropdownItem >
            Settings
          </DropdownItem>

        </div>




      </CSSTransition >


    </div >
  );
}
export default DropdownMenu;
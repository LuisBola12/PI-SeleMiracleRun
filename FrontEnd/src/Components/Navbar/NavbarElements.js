import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
  position: sticky;
  top:0;
  background: #133c54;
  height:80px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc((100vw-1000px)/2);
  z-index: 10;
  @media screen and (max-width: 768px) {
    flex-direction:column;
  }
`;

export const NavLink = styled(Link)`
  position: sticky;
  top:0;
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  margin-left: 50px;
  margin-right: 50px;
  &.active {
    color: #15cdfc;
  }
`;

export const NavMenu = styled.div`
  position: sticky;
  top:0;
  display: flex;
  align-items: center;
  margin-left: 180px;
  margin-left: 12.2%;
  @media screen and (max-width: 768px) {
    flex-direction:column;
  }
`;

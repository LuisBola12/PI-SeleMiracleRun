import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
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
  color: white;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  margin-left: 18px;
  margin-right: 18px;
  font-weight: 200;
  &.active {
    margin-top: auto;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    height: 70%;
    color: #133c54;
    font-weight: bolder;
    background: #fff;
    font-size: 18px;
    text-decoration: underline;
  }
  &:hover {
    color: #52d6d3;
    font-weight: 600;
    text-decoration: underline;
  }
  // border: solid red;
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-left: 180px;
  margin-left: 12.2%;
  @media screen and (max-width: 768px) {
    flex-direction:column;
  }
`;

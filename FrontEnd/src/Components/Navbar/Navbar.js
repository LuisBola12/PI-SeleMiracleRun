import { React } from "react";
import { useSelector } from 'react-redux';
import { Nav, NavLink, NavMenu } from './NavbarElements';
import { DropdownMenu, Menu } from '../DropDownMenu/DropDownMenu';
import { ReactComponent as ListIcon } from '../DropDownMenu/icons/list.svg';
import './Navbar.css';
// import { getContractEmployee } from "../../Utils/Calendar/getCalendarInfo";

export const Navbar = () => {
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const contractType = useSelector((state) => state.activeProject.contractType);
  const user = useSelector((state) => state.user.user);
  // const [contractType, setContractType] = useState('');
  // const [ dataReceived , setDataReceived ] = useState(0);

  // useEffect(() => {
  //   const getData = async () => {
  //     const data = await getContractEmployee(user.Cedula, activeProject);
  //     console.log('contactType')
  //     console.log(contractType)
  //     if (data) {
  //       setContractType(data[0].TipoContrato);
  //       setDataReceived(dataReceived+1)
  //       console.log('contactType')
  //       console.log(contractType)
  //     }
  //   };
  //     getData();
  // }, []);

  return (
    <>
      <div>
        <Nav>
          <div className='navBar-logo'></div>
          <NavMenu>
            {user.Roles === 'admin' &&
              <>
                <NavLink to="/dashBoard" activestyle='true'>
                  DashBoard
                </NavLink>
                <NavLink to='/payroll' activestyle='true'>
                  Payroll
                </NavLink>
                <NavLink to='/employees' activestyle='true'>
                  Employees
                </NavLink>
                <NavLink to='/benefits' activestyle='true'>
                  Benefits
                </NavLink>
                <NavLink to='/voluntaryDeductions' activestyle='true'>
                  Voluntary Deductions
                </NavLink>
              </>
            }
            {user.Roles === 'emp' &&
              <>
                <NavLink to="/myPayments" activestyle='true'>
                  My Payments
                </NavLink>
                <NavLink to='/myBenefits' activestyle='true'>
                  My Benefits
                </NavLink>
                <NavLink to="/myVoluntaryDeductions" activestyle='true'>
                  My Voluntary Deductions
                </NavLink>
                { contractType === 'Por Horas' && 
                  <NavLink to="/registerHours" activestyle='true'>
                  Hours
                 </NavLink>
                }
              </>
            }
          </NavMenu>
          <div className='navbar-corner'>
            <div className='navbar-project-user'>
              <div className='activeProject'>{activeProject}</div>
              <div className='activeUser'>{user.Email.charAt(0).toLocaleUpperCase()}</div>
            </div>
            <Menu icon={<ListIcon />}>
              <DropdownMenu></DropdownMenu>
            </Menu>
          </div>

        </Nav>

      </div>
    </>
  );
};
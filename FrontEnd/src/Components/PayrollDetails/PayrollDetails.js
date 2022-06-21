import React from 'react';
import { IconContext } from 'react-icons';
import { FaArrowLeft } from 'react-icons/fa';
import { transformCost } from '../../shared/moneyFormatTransform';
import history from './../../history';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getPayrrollPayslips } from './../../Utils/PayrrollDetails/getPayrrollPayslips';
import { useSelector } from 'react-redux';

export const PayrollDetails = () => {
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const [startDate,setStartDate] = useState();
  const [endDate,setEndDate] = useState();
  const [data,setData] = useState([]);
  const [infoReceived,setInfoReceived] = useState(false);
  const location = useLocation();
  const back = () => {
    history.push('/payroll');
    history.go();
  };
  useEffect(() => {
    const getData = async () => {
      const newData = await getPayrrollPayslips(activeProject,location.state.Consectivo);
      setStartDate(location.state.StartDate);
      setEndDate(location.state.EndDate);
      setData(newData);
      setInfoReceived(true);
    };
    getData();
  }, []);
  return !infoReceived ? <div className='loader'></div> :(
    <>
      <div className='details-table-button'>
        <IconContext.Provider value={{ color: 'gray', className: 'global-class-name', size: '2.6rem'}}>
          <button className='back-arrow-button' onClick={()=>{back();}}>
            <FaArrowLeft />
          </button>
        </IconContext.Provider>
        <h2 className='details-head-title'>
        {`PaySlips from: ${startDate} - ${endDate}`}
      </h2>
      </div>
      
      <table className='Table'>
        <thead>
          <tr className='table-header'>
            <th className='left-td table-left-border'>Id</th>
            <th className='left-td'>Name</th>
            <th className='left-td'>Type of Contract</th>
            <th className='right-td'>Hours Worked</th>
            <th className='right-td'>Hourly Wage</th>
            <th className='right-td'>Gross Salary</th>
            <th className='right-td'>Employer Mandatory Deductions</th>
            <th className='right-td'>Employee Mandatory Deductions</th>
            <th className='right-td'>Voluntary Deductions</th>
            <th className='right-td'>Benefits</th>
            <th className='table-right-border right-td'>Net Salary</th>
            {/* <th className='table-right-border'>Employees Payslips</th> */}
          </tr>
        </thead>
        <tbody>
          {data.map((element) => (
            <tr key={element.id}>
              <td className='left-td table-left-border'>{element.Cedula}</td>
              <td className='left-td'>{element.NombreCompleto}</td>
              <td className='left-td'>{element.TipoContrato}</td>
              <td className='right-td'>{element.HorasTrabajadas}</td>
              <td className='right-td'>{transformCost(element.SalarioPorHora)}</td>
              <td className='right-td'>{transformCost(element.SalarioBruto)}</td>
              <td className='right-td'>{transformCost(element.DeduccionesObligatoriasEmpleador)}</td>
              <td className='right-td'>{transformCost(element.DeduccionesObligatoriasEmpleado)}</td>
              <td className='right-td'>{transformCost(element.DeduccionesVoluntarias)}</td>
              <td className='right-td'>{transformCost(element.Beneficios)}</td>
              <td className='table-right-border right-td'>{transformCost(element.SalarioNeto)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

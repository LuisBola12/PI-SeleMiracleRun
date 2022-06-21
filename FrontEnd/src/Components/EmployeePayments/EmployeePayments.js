import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../../App.css';
import { getAnEntity } from '../../Utils/getAnEntity';
export const EmployeePayments= () => {
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const employeeEmail = useSelector( ( state ) => state.user.user.Email ); 

  const [employeePayments, setEmployeePayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true) 

 useEffect(() => {
  setIsLoading(true);
  const getEmployeeInfo= async () =>{

  const infoReceived =  await getAnEntity('employeePayments', `/${activeProject}/${employeeEmail}`)
  setEmployeePayments(infoReceived);
  console.log(infoReceived);
  setIsLoading(false);
  }
  getEmployeeInfo();
 }, [activeProject, employeeEmail])

  return  ( isLoading? <h1>loading</h1> :
    <>
      {/* <div className='details-table-button'>
      </div> */}
      <h2 className='table-button'>My Payments</h2> 
      <table className='Table'>
        <thead>
          <tr className='table-header'>
            <th className='left-td table-left-border'>Id</th>
            <th className='left-td'>Name</th>
            <th className='left-td'>Type of Contract</th>
            <th className='right-td'>Hours Worked</th>
            <th className='right-td'>Hourly Wage</th>
            <th className='right-td'>Gross Salary</th>
            <th className='right-td'>Employee Mandatory Deductions</th>
            <th className='right-td'>Voluntary Deductions</th>
            <th className='right-td'>Benefits</th>
            <th className='table-right-border right-td'>Net Salary</th>
            {/* <th className='table-right-border'>Employees Payslips</th> */}
          </tr>
        </thead>
        <tbody>
          {employeePayments.map((row) => (
            <tr key={row.ConsecutivoPago}>
              <td  className='left-td table-left-border'>{row.Cedula}</td>
              
              {/* <td key={element.consecutivoPago} className='table-right-border right-td'> hola</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

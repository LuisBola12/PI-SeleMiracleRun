import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../../App.css';
import { getAnEntity } from '../../Utils/getAnEntity';
export const EmployeePayments = () => {
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const employeeEmail = useSelector((state) => state.user.user.Email);

  const [employeePayments, setEmployeePayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'CRC',
  });

  const removeTimeFromDate = (date) => {
    let myDate = new Date(date);
    let noTimeDate = new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate());
    return noTimeDate.toDateString();
  };

  useEffect(() => {
    setIsLoading(true);
    const getEmployeeInfo = async () => {

      const infoReceived = await getAnEntity('employeePayments', `/${activeProject}/${employeeEmail}`);
      if (infoReceived === undefined) {
        setEmployeePayments([]);
      } else {
        setEmployeePayments(infoReceived);
        console.log(infoReceived);
      }
      setIsLoading(false);
    };
    getEmployeeInfo();
  }, [activeProject, employeeEmail]);

  return (isLoading ? <div className='loader' ></div > :
    <>
      <h2 className='table-button'>My {activeProject} Payments</h2>
      <table className='Table'>
        <thead>
          <tr className='table-header'>
            <th className='left-td table-left-border'>Contract Type</th>
            <th className='right-td'>Payment Date</th>
            <th className='right-td'>Hours Worked</th>
            <th className='right-td'>Hourly Wage</th>
            <th className='right-td'>Gross Salary</th>
            <th className='right-td'>Mandatory Deductions</th>
            <th className='right-td'>Voluntary Deductions</th>
            <th className='right-td'>Benefits</th>
            <th className='table-right-border right-td'>Net Salary</th>
          </tr>
        </thead>
        <tbody>
          {employeePayments.slice(0).reverse().map((row) => (
            <tr key={row.ConsecutivoPago}>
              <td className='left-td table-left-border'>{row.TipoContrato}</td>
              <td className='right-td'>{removeTimeFromDate(row.FechaFin)}</td>
              <td className='right-td'>{row.TipoContrato === 'Por horas' ? row.SalarioBruto / row.SalarioPorHoras : '-'}</td>
              <td className='right-td'>{formatter.format(row.SalarioPorHoras)}</td>
              <td className='right-td'>{formatter.format(row.SalarioBruto)}</td>
              <td className='right-td'>{row.TipoContrato === 'Servicios Profesionales' ? '-' : formatter.format(row.MontoTotalDeduccionesObligatoriasEmpleado)}</td>
              <td className='right-td'>{row.TipoContrato === 'Servicios Profesionales' ? '-' : formatter.format(row.MontoTotalDeduccionesVoluntarias)}</td>
              <td className='right-td'>{row.TipoContrato === 'Servicios Profesionales' ? '-' : formatter.format(row.MontoTotalBeneficios)}</td>
              <td className='right-td'>{formatter.format(row.SalarioNeto)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <label className='Empty-message'>{(employeePayments.length === 0) ? 'No Payments made to me yet' : ''}</label>
    </>
  );
};

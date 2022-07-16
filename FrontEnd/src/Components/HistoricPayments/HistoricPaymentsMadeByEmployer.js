import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../../App.css';
import { removeTimeFromDate } from '../../shared/removeTimeFromDate';
import { useProjectsData } from '../../Utils/PayrollProjects/useProjectsData';
import { IconContext } from 'react-icons';
import { FaFilter } from 'react-icons/fa';
import { DateRangeSelect } from '../DateRangeSelect/DateRangeSelect';
import { addDays } from 'date-fns';
import { ExportToExcelButton } from '../ExportToExcelButton/ExportToExcelButton';
import { Pagination } from '../Pagination/Pagination';

export const HistoricPaymentsMadeByEmployer = () => {
  const seleUrl = process.env.REACT_APP_BACKEND_LOCALHOST;

  const [ employeePayments, setEmployeePayments ] = useState( [] );
  const [ isLoading, setIsLoading ] = useState( true );
  const [ projectNameFilter, setProjectNameFilter ] = useState( 'Any' );
  const [ filterSwitch, setFilterSwitch ] = useState( false );
  const [ pageNumber, setPageNumber ] = useState( 1 );
  const perPage = 10;
  const employerID = useSelector( ( state ) => state.user.user.Cedula );

  const [ range, setRange ] = useState( [
    {
      startDate: addDays( new Date(), -60 ),
      endDate: addDays( new Date(), 1 ),
      key: 'selection'
    }
  ] );
  const { projects } = useProjectsData();

  let formatter = new Intl.NumberFormat( undefined, {
    style: 'currency',
    currency: 'CRC',
  } );

  useEffect( () => {
    setIsLoading( true );
    const getEmployeeInfo = async () => {
      // const apiPayments = `/${employeeEmail}/${projectNameFilter}/${range[0].startDate}/${range[0].endDate}`;
      const infoReceived = await fetch( `${seleUrl}payments/${employerID}` );
      const payments = await infoReceived.json();
      if ( payments === undefined ) {
        setEmployeePayments( [] );
      } else {
        setEmployeePayments( payments );
        console.log( payments );
      }
      setIsLoading( false );
    };
    getEmployeeInfo();
  }, [ projectNameFilter, filterSwitch ] );


  const maxPage = Math.ceil( employeePayments.length / perPage );

  return ( isLoading ? <div className='loader' ></div > :
    <>
      <h2 className='table-button'>My Payments Report</h2>
      <div className='report-header'>
        <div className='filter-payments-report'>
          <IconContext.Provider
            value={{
              className: 'filter-icon',
            }}
          >
            <label>
              <FaFilter />
            </label>
          </IconContext.Provider>
          <label>By Project Name</label>
          <select
            className='project-Name-Filter'
            value={projectNameFilter}
            onChange={( e ) => {
              setProjectNameFilter( e.target.value );
            }}
          >
            <option value={'Any'}> Any </option>
            {projects.map( ( element ) => (
              <option key={element.Nombre} value={element.Nombre}>
                {element.Nombre}
              </option>
            ) )
            }
          </select>

          <br />
          <label>By Date</label>
          <DateRangeSelect
            range={range}
            setRange={setRange}
            filterSwitch={filterSwitch}
            setFilterSwitch={setFilterSwitch}
          />


        </div>
        <ExportToExcelButton
          objectsArray={employeePayments}
          sheetName={'myPayments'}
          fileName={'myPaymentsReport'}
        />

      </div>

      <table className='Table' id='EmployeePaymentsTable'>
        <thead>
          <tr className='table-header'>
            <th className='left-td table-left-border'>Nombre</th>
            <th className='right-td'>Proyecto</th>
            <th className='right-td'>Cedula</th>
            <th className='right-td'>Tipo de Empleado</th>
            <th className='right-td'>Salario Bruto</th>
            <th className='right-td'>Beneficios</th>
            <th className='right-td'>Cargas Sociales Empleador</th>
            <th className='right-td'>Deducciones Obligatorias Empleado</th>
            <th className='right-td'>Deducciones Voluntarias</th>
            <th className='table-right-border right-td'>Costo Empleador</th>
          </tr>
        </thead>
        <tbody>
          {employeePayments.slice( ( pageNumber - 1 ) * perPage, ( pageNumber - 1 ) * perPage + perPage ).reverse().map( ( row ) => (
            <tr key={row.ConsecutivoPago}>
              <td className='left-td table-left-border'>{row.Nombre + ' ' + row.Apellido1 + ' ' + row.Apellido2}</td>
              <td className='right-td'>{row.NombreProyecto}</td>
              <td className='right-td'>{row.CedulaEmpleado}</td>
              <td className='right-td'>{row.TipoContrato}</td>
              {/* <td className='right-td'>{removeTimeFromDate( row.FechaFin )}</td> */}
              <td className='right-td'>{formatter.format( row.SalarioBruto )}</td>
              <td className='right-td'>{formatter.format( row.MontoTotalBeneficios )}</td>
              <td className='right-td'>{formatter.format( row.MontoTotalDeduccionesObligatoriasEmpleador )}</td>
              <td className='right-td'>{formatter.format( row.MontoTotalDeduccionesObligatoriasEmpleado )}</td>
              <td className='right-td'>{formatter.format( row.MontoTotalDeduccionesVoluntarias )}</td>
              {/* <td className='right-td'>{row.TipoContrato === 'Por horas' ? formatter.format( row.SalarioPorHoras ) : '-'}</td> */}
              {/* <td className='right-td'>{formatter.format( row.SalarioBruto )}</td> */}
              {/* <td className='right-td'>{row.TipoContrato === 'Servicios Profesionales' ? '-' : formatter.format( row.MontoTotalDeduccionesObligatoriasEmpleado )}</td> */}
              {/* <td className='right-td'>{row.TipoContrato === 'Servicios Profesionales' ? '-' : formatter.format( row.MontoTotalDeduccionesVoluntarias )}</td> */}
              <td className='right-td'>{formatter.format( row.SalarioBruto + row.MontoTotalDeduccionesObligatoriasEmpleador )}</td>
            </tr>
          ) )}
        </tbody>
      </table>
      <label className='Empty-message'>{( employeePayments.length === 0 ) ? 'No Payments made to me yet' : ''}</label>

      <Pagination
        page={pageNumber}
        setPage={setPageNumber}
        maxPage={maxPage}
      />

    </>
  );
};

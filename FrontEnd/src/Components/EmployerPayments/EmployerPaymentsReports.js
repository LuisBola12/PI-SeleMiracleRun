import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../../App.css';
import { getAnEntity } from '../../Utils/getAnEntity';
import { removeTimeFromDate } from '../../shared/removeTimeFromDate';
import { useProjectsData } from '../../Utils/PayrollProjects/useProjectsData';
import { IconContext } from 'react-icons';
import { FaFilter } from 'react-icons/fa';
import { DateRangeSelect } from '../DateRangeSelect/DateRangeSelect';
import { addDays } from 'date-fns';
import { ExportToExcelButton } from '../ExportToExcelButton/ExportToExcelButton';
import { Pagination } from '../Pagination/Pagination';

export const EmployerPaymentsReports = () => {
  const lastDaysToShow = 60;
  const [ pageNumber, setPageNumber ] = useState( 1 );
  const [ perPage, setPerPage ] = useState( 10 );
  const employerEmail = useSelector( ( state ) => state.user.user.Email );
  const [ allEmployerPayments, setAllEmployerPayments ] = useState( [] );
  const [ isLoading, setIsLoading ] = useState( true );
  const [ projectNameFilter, setProjectNameFilter ] = useState( 'Any' );
  const [ filterSwitch, setFilterSwitch ] = useState( false );
  const [ range, setRange ] = useState( [
    {
      startDate: addDays( new Date(), -lastDaysToShow ),
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
      const apiPayments = `/${employerEmail}/${projectNameFilter}/${range[0].startDate}/${range[0].endDate}`;
      const infoReceived = await getAnEntity( 'employeePayments', apiPayments );
      if ( infoReceived === undefined ) {
        setEmployerPayments( [] );
      } else {
        setAllEmployerPayments( infoReceived );
      }
      setIsLoading( false );
    };
    getEmployerInfo();
  }, [ projectNameFilter, filterSwitch ] );

  const maxPage = Math.ceil( allEmployerPayments.length / perPage );

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
          objectsArray={allEmployerPayments}
          sheetName={'myPayments'}
          fileName={'myPaymentsReport'}
        />

      </div>
      
      <table className='Table' id='EmployerPaymentsTable'>
        <thead>
          <tr className='table-header'>
            <th className='left-td table-left-border'>Project</th>
            <th className='right-td'>Payment Frequency</th>
            <th className='right-td'>Payment Date</th>
            <th className='right-td'>Gross Salaries</th>
            <th className='right-td'>Benefits</th>
            <th className='right-td'>Employer Social</th>
            <th className='right-td'>Employee Obligatory Deductions</th>
            <th className='right-td'>Voluntary Deductions</th>
            <th className='table-right-border right-td'>Employer Cost</th>
          </tr>
        </thead>
        <tbody>
          {allEmployerPayments.slice( ( pageNumber - 1 ) * perPage, ( pageNumber - 1 ) * perPage + perPage  ).reverse().map( ( row ) => (
            <tr key={row.ConsecutivoPago}>
              <td className='left-td table-left-border'>{row.NombreProyecto}</td>
              <td className='right-td'>{row.TipoContrato}</td>
              <td className='right-td'>{removeTimeFromDate( row.FechaFin )}</td>
              <td className='right-td'>{row.TipoContrato === 'Por horas' ? row.SalarioBruto / row.SalarioPorHoras : '-'}</td>
              <td className='right-td'>{row.TipoContrato === 'Por horas' ? formatter.format( row.SalarioPorHoras ) : '-'}</td>
              <td className='right-td'>{formatter.format( row.SalarioBruto )}</td>
              <td className='right-td'>{row.TipoContrato === 'Servicios Profesionales' ? '-' : formatter.format( row.MontoTotalDeduccionesObligatoriasEmpleado )}</td>
              <td className='right-td'>{row.TipoContrato === 'Servicios Profesionales' ? '-' : formatter.format( row.MontoTotalDeduccionesVoluntarias )}</td>
              <td className='right-td'>{formatter.format( row.SalarioNeto )}</td>
            </tr>
          ) )}
        </tbody>
      </table>
      <label className='Empty-message'>{( allEmployerPayments.length === 0 ) ? 'No Payments made yet' : ''}</label>
      
      <Pagination 
        page={pageNumber}
        setPage={setPageNumber}
        maxPage = {maxPage}
      />
    </>
  );
};

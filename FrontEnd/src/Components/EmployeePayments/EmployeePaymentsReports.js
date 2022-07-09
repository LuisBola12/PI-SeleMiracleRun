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

export const EmployeePaymentsReports = () => {
  const paymentsPerPage = 5;
  const employeeEmail = useSelector( ( state ) => state.user.user.Email );
  const [ allEmployeePayments, setAllEmployeePayments ] = useState( [] );
  const [ isLoading, setIsLoading ] = useState( true );
  const [ currentPagePayments, setCurrentPagePayments ] = useState( [] );
  const [ currentPageNumber, setCurrentPageNumber ] = useState( 0 );
  const [ projectNameFilter, setProjectNameFilter ] = useState( 'Any' );
  const [ filterSwitch, setFilterSwitch ] = useState( false );
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
      const apiPayments = `/${employeeEmail}/${projectNameFilter}/${range[0].startDate}/${range[0].endDate}`;
      const infoReceived = await getAnEntity( 'employeePayments', apiPayments );
      if ( infoReceived === undefined ) {
        setEmployeePayments( [] );
      } else {
        setAllEmployeePayments( infoReceived );
        setCurrentPagePayments( infoReceived.slice( 0, paymentsPerPage ) );
      }
      setIsLoading( false );
    };
    getEmployeeInfo();
  }, [ projectNameFilter, filterSwitch ] );
  const handleNextPage = () => {
    const totalPayments = allEmployeePayments.length;
    const nextPage = currentPageNumber + 1;
    const firstIndex = nextPage * paymentsPerPage;

    if ( firstIndex >= totalPayments ) return;
    setCurrentPagePayments( [ ...allEmployeePayments ].slice( firstIndex,paymentsPerPage ) );
    console.log( firstIndex, currentPagePayments );
    setCurrentPageNumber( nextPage );
  };

  const handlePrevPage = () => {
    console.log( 'prev' );
  }; 

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
          objectsArray={allEmployeePayments}
          sheetName={'myPayments'}
          fileName={'myPaymentsReport'}
        />

      </div>

      <table className='Table' id='EmployeePaymentsTable'>
        <thead>
          <tr className='table-header'>
            <th className='left-td table-left-border'>Project</th>
            <th className='right-td'>Contract Type</th>
            <th className='right-td'>Payment Date</th>
            <th className='right-td'>Hours Worked</th>
            <th className='right-td'>Hourly Wage</th>
            <th className='right-td'>Gross Salary</th>
            <th className='right-td'>Mandatory Deductions</th>
            <th className='right-td'>Voluntary Deductions</th>
            <th className='table-right-border right-td'>Net Salary</th>
          </tr>
        </thead>
        <tbody>
          {currentPagePayments.slice( 0 ).reverse().map( ( row ) => (
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
      <label className='Empty-message'>{( allEmployeePayments.length === 0 ) ? 'No Payments made to me yet' : ''}</label>
      <div>
        <button onClick={handlePrevPage}> Previous Page </button>
        <label> Page {currentPageNumber} </label>
        <button onClick={handleNextPage}> Next Page </button>
      </div>
    </>
  );
};

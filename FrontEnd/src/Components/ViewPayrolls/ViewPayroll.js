import React from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

export const ViewPayroll = () => {
  const navigate = useNavigate();
  const data = [
    {
      'consecutiveNumber':3,
      'StartDate': '6/1/2022',
      'EndDate': '6/15/2022',
      'Status': 'Open'
    },
    {
      'consecutiveNumber':2,
      'StartDate': '5/15/2022',
      'EndDate': '5/31/2022',
      'Status': 'Closed'
    },
    {
      'consecutiveNumber':1,
      'StartDate': '5/1/2022',
      'EndDate': '5/14/2022',
      'Status': 'Closed'
    }
  ];
  const goToDetails = (element) => {
    navigate('/payroll/details', { state: element });
  };

  return /*!infoReceived ? <div className='loader' ></div > : */(
    <>
      <div className='table-button'>
        <br />
        <button className='create-button'>Pay Payroll</button>
        <br />
      </div>
      <table className='Table'>
        <thead>
          <tr className='table-header'>
            <th className='table-left-border'>#</th>
            <th className=''>Start Date</th>
            <th className=''>End Date</th>
            <th className=''>Status</th>
            <th className='table-right-border'>Employees Payslips</th>
          </tr>
        </thead>
        <tbody>
          {data.map((element) => (
            <tr key={element.consecutiveNumber}>
              <td className=''>{element.consecutiveNumber}</td>
              <td className=''>{element.StartDate}</td>
              <td className=''>{element.EndDate}</td>
              <td className=''>
                    Closed</td>
              <td className=''>
                <button className='details-button' onClick={ () => {
                  goToDetails(element);
                }}>Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <label className='Empty-message'>{(data.length === 0) ? 'No Payrolls made yet' : ''}</label>
    </>
  );
};

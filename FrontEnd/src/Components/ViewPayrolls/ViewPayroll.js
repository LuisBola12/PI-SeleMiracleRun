import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useEffect,React,useState } from 'react';
import { getAnEntity } from '../../Utils/getAnEntity';
import { useSelector } from 'react-redux';

export const ViewPayroll = () => {
  const [infoReceived, setInfoReceived] = useState(false);
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const [data, setData] = useState();
  const navigate = useNavigate();
  const goToDetails = (element) => {
    navigate('/payroll/details', { state: element });
  };
  const removeTimeFromDate = (date) =>{
    let myDate = new Date(date);
    let noTimeDate = new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate());
    return noTimeDate.toDateString();
  }
  useEffect(() => {
    const getData = async () => {
      const newData = await getAnEntity('payrrolls/', activeProject);
      setData(newData);
      setInfoReceived(true);
    };
    getData();
  }, []);
  return !infoReceived ? <div className='loader' ></div > : (
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
              <td className=''>{element.Consectivo}</td>
              <td className=''>{removeTimeFromDate(element.FechaIncio)}</td>
              <td className=''>{removeTimeFromDate(element.FechaFin)}</td>
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

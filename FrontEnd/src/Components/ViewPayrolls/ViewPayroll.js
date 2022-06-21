import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useEffect,React,useState } from 'react';
import { getAnEntity } from '../../Utils/getAnEntity';
import { useSelector } from 'react-redux';

export const ViewPayroll = () => {
  const [infoReceived, setInfoReceived] = useState(false);
  const user = useSelector((state) => state.user.user);
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
  const handlePayment = async() =>{
    const seleUrl = 'http://localhost:4000/createPayrroll'
    console.log(user.Cedula,activeProject)
    const postFetch = await fetch(seleUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        Cedula: user.Cedula,
        NombreProyecto: activeProject,
      }),
    });
    if(postFetch.ok === true){
      setInfoReceived(false)
    }
  }
  useEffect(() => {
    const getData = async () => {
      const newData = await getAnEntity('payrrolls/', activeProject);
      setData(newData);
      setInfoReceived(true);
    };
    getData();
  }, [infoReceived]);
  return !infoReceived ? <div className='loader' ></div > : (
    <>
      <div className='table-button'>
        <br />
        <button className='create-button' onClick={handlePayment}>Pay Payroll</button>
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
          {data.slice(0).reverse().map((element) => (
            <tr key={element.Consectivo}>
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

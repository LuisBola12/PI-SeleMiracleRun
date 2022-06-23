import React from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useGetEmployeesToHire } from '../../Utils/HireAEmployee/useGetToHireEmployees';
import { useNavigate } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { FaArrowLeft } from 'react-icons/fa';

export const CrudHire = () => {
  const navigate = useNavigate();
  const handleHireEmployee = (element) => {
    navigate('hire', { state: element });
  };
  const back = () => {
    navigate(-1);
  }
  const { employeesToHire, infoReceived } = useGetEmployeesToHire();
  return !infoReceived ? <div className='loader' ></div > : (
    <>
      {console.log(employeesToHire)}
      <div className='table-button'>
        <IconContext.Provider value={{ color: 'gray', className: 'global-class-name', size: '2.6rem' }}>
          <button className='back-arrow-button' onClick={() => { back(); }}>
            <FaArrowLeft />
          </button>
        </IconContext.Provider>
      </div>
      <table className='Table'>
        <thead>
          <tr className='table-header'>
            <th className='table-left-border left-td'>Id</th>
            <th className='left-td'>Name</th>
            <th className='left-td'>First lastname</th>
            <th className='left-td'>Project Name</th>
            <th className='left-td'>Type Of Contract</th>
            <th className='table-right-border center-td'></th>
          </tr>
        </thead>
        <tbody>
          {employeesToHire.map((element) => (
            <tr key={element.Cedula}>
              <td className='left-td table-left-border'>{element.Cedula}</td>
              <td className='left-td'>{element.Nombre}</td>
              <td className='left-td'>{element.Apellido1}</td>
              <td className='left-td'>{element.NombreProyecto}</td>
              <td className='left-td'>{element.TipoContrato}</td>
              <td className='center-button'>
                <button className='button' onClick={() => handleHireEmployee(element)}> Hire </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <label className='Empty-message'>{(employeesToHire.length === 0) ? 'There is no employees to hire' : ''}</label>
    </>
  );
};
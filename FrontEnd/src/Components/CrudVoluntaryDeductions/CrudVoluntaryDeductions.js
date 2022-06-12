import React from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useGetVoluntaryDeductionsFromDatabase } from '../../Utils/VoluntaryDeductions/useGetVoluntaryDeductionsFromDatabase';
import { useNavigate } from 'react-router-dom';
import { transformCost } from '../../shared/moneyFormatTransform';

export const CrudVoluntaryDeductions = () => {
  const navigate = useNavigate();
  const handleCreateClick = () => {
    navigate('/voluntaryDeductions/CreateVoluntaryDeductions');
  };
  const handleEditClick = (element) => {
    navigate('/voluntaryDeductions/editVoluntaryDeduction', { state: element });
  };
  const { projectVoluntaryDeductions, infoReceived } = useGetVoluntaryDeductionsFromDatabase();
  return !infoReceived ? <div className='loader' ></div > : (
    <>
      <div className='table-button'>
        <button className='create-button'
          onClick={handleCreateClick}
        >Create New Voluntary Deduction</button><br />
      </div>
      <table className='Table'>
        <thead>
          <tr className='table-header'>
            <th className='table-left-border left-td'>Voluntary Deduction</th>
            <th className='left-td'>Description</th>
            <th className='right-td'>Cost</th>
            <th className='right-td'>Edit</th>
            <th className='table-right-border right-td'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {projectVoluntaryDeductions.map((element) => (
            <tr key={element.Nombre}>
              <td className='left-td'>{element.Nombre}</td>
              <td className='description-cell left-td'>{((element.Descripcion) ? element.Descripcion : 'No description')}</td>
              <td className='right-td'>₡ {transformCost(element.Costo)}</td>
              <td className='right-button'>
                <button className=' button'  onClick={() => handleEditClick(element)}> Edit </button>
              </td>
              <td className='right-button'>
                <button className=' button cancel-button' > Delete </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <label className='Empty-message'>{(projectVoluntaryDeductions.length === 0) ? 'No voluntary deductions added yet' : ''}</label>
    </>
  );
};

import React from 'react';
import '../../App.css';
import { transformCost } from '../../shared/moneyFormatTransform';
import { useGetVolDeductionsFromDatabase } from '../../Utils/volDeductions/useGetVolDeductionsFromDatabase';
import { useState } from 'react';

const database = [
  {
    Nombre: 'Spa',
    CostoActual: 25000,
    Descripción: 'Dinero para spa'
  },
  {
    Nombre: 'Almuerzo',
    CostoActual: 20000,
    Descripción: 'Dinero para que los empleados compren sus almuerzos'
  }

];

export const EmployeeVolDeductions = () => {
  const isVinculated = (name) => {
    for (let i = 0; i < database.length; i++) {
      if (database[i].Nombre == name) {
        return true;
      }
    }
    return false;
  };
  const { projectVolDeductions, infoReceived } = useGetVolDeductionsFromDatabase();
  const [data, setdata] = useState(database);
  const handleAddButton = (element) => {
    //En desarrollo, se agregó este agregado básico solo para pruebas.
    setdata([...data, element]);
  };
  return !infoReceived ? <div className='loader' ></div > : (
    <>
      <h2 className = 'table-button'>My Voluntary Deductions</h2>
      <table className='Table'>
        <thead>
          <tr className='table-header'>
            <th className='table-left-border left-td'>Deduction</th>
            <th className='left-td'>Description</th>
            <th className='right-td'>Cost</th>
            <th className='table-right-border right-td'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((element) => (
            <tr key={element.Nombre}>
              <td className='left-td bottom-border table-left-border'>{element.Nombre}</td>
              <td className='description-cell left-td bottom-border'>{((element.Descripcion) ? element.Descripción : 'No description')}</td>
              <td className='right-td bottom-border'>₡ {transformCost(element.Costo)}</td>
              <td className='right-button bottom-border table-right-border'>
                <button className='button cancel-button' > Delete </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <label className='Empty-message'>{(data.length === 0) ? 'No voluntary deductions selected added yet' : ''}</label>

      <h2>Offered Voluntary Deductions</h2>
      <table className='Table'>
        <thead>
          <tr className='table-header'>
            <th className='table-left-border left-td'>Deduction</th>
            <th className='left-td'>Description</th>
            <th className='right-td'>Actual</th>
            <th className='table-right-border right-td'>Add</th>
          </tr>
        </thead>
        <tbody>
          {projectVolDeductions.map((element) => (
            <tr key={element.Nombre}>
              {isVinculated(element.Nombre) == false &&
                  <>
                    <td className='left-td bottom-border table-left-border'>{element.Nombre}</td>
                    <td className='description-cell left-td bottom-border'>{((element.Descripcion) ? element.Descripción : 'No description')}</td>
                    <td className='right-td bottom-border'>₡ {transformCost(element.Costo)}</td>
                    <td className='right-button bottom-border table-right-border'>
                      <button className='button add-button' onClick={() => handleAddButton(element)}> Add</button>
                    </td>
                  </>
              }
            </tr>
          ))}
        </tbody>
      </table>
      <label className='Empty-message'>{(projectVolDeductions.length === 0) ? 'No voluntary deductions added added yet' : ''}</label>
    </>
  );
};
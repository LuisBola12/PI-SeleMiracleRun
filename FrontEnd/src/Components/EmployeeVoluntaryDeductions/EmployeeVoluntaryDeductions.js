import React from 'react';
import '../../App.css';
import { transformCost } from '../../shared/moneyFormatTransform';
import { useGetVoluntaryDeductionsFromDatabase } from '../../Utils/VoluntaryDeductions/useGetVoluntaryDeductionsFromDatabase';
import { useState } from 'react';
import { useGetEmployeeVoluntaryDeductions } from '../../Utils/VoluntaryDeductions/useGetEmployeeVoluntaryDeductions';

export const EmployeeVoluntaryDeductions = () => {
  const { projectVoluntaryDeductions, infoReceived } = useGetVoluntaryDeductionsFromDatabase();
  const { EmployeeVoluntaryDeductions, EmployeeInfo } = useGetEmployeeVoluntaryDeductions();
  const handleAddButton = (element) => {

  };
  return (
    <>
      {!infoReceived ? <div className='loader' ></div > : (
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
              {EmployeeVoluntaryDeductions.map((element) => (
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
          <label className='Empty-message'>{(EmployeeVoluntaryDeductions.length === 0) ? 'No voluntary deductions selected added yet' : ''}</label>
        </>)}

      {!infoReceived ? (<div className='loader' ></div >) : (
        <>
          <h2 className='ofer-benefits'> Offered Voluntary Deductions</h2>
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
              {projectVoluntaryDeductions.map((element) => (
                <tr key={element.Nombre}>
                  <>
                    <td className='left-td bottom-border table-left-border'>{element.Nombre}</td>
                    <td className='description-cell left-td bottom-border'>{((element.Descripcion) ? element.Descripción : 'No description')}</td>
                    <td className='right-td bottom-border'>₡ {transformCost(element.Costo)}</td>
                    <td className='right-button bottom-border table-right-border'>
                      <button className='button add-button' onClick={() => handleAddButton(element)}> Add</button>
                    </td>
                  </>
                </tr>
              ))}
            </tbody>
          </table>
          <label className='Empty-message'>{(projectVoluntaryDeductions.length === 0) ? 'No voluntary deductions added added yet' : ''}</label>
        </>)}
    </>
  );
};
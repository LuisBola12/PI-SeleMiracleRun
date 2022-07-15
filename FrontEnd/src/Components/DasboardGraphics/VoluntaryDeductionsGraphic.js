import React from 'react'
import { BarPlot } from '../Plots/BarPlot'

export const VoluntaryDeductionsGraphic = () => {

  const voluntaryDeductionsLables = ['Gym', 'Almuerzo', 'Transporte'];
  const voluntaryDeductionsData = [4,3,7];


  return (
    <div className='voluntaryDeductions-graphic-container'>
      <h3> Voluntary deductions selected by employees</h3>
      <BarPlot
        dataLabels={voluntaryDeductionsLables}
        dataValues= {voluntaryDeductionsData}
        plotLabel={'Voluntary Deductions'}
      />
    </div>    

  )
}
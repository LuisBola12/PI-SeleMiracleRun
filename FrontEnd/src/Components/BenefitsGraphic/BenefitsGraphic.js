import React from 'react'
import { DoughnutPlot } from '../Plots/DoughnutPlot'

export const BenefitsGraphic = () => {
  
  const benefitsLables = ['Gym', 'Almuerzo', 'Transporte'];
  const benefitsData = [4,3,7];
  
  
  return (
    <div className='benefit-graphic-container'>
      <h3> Benefits selected by employees</h3>
      <DoughnutPlot
        dataLabels={benefitsLables}
        dataValues= {benefitsData}
        dataTitle={'Benefits'}
      />
    </div>    
    
  )
}

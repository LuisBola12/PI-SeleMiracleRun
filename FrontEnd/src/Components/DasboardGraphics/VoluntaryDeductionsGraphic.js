import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BarPlot } from '../Plots/BarPlot'
import { getVoluntaryDeductionsStatistics } from '../../Utils/VoluntaryDeductions/getVoluntaryDeductionsStatistics';

export const VoluntaryDeductionsGraphic = () => {

  const user = useSelector((state) => state.user.user);
  const [voluntaryDeductionsLables, setVoluntaryDeductionsLabels] = useState([]);
  const [voluntaryDeductionsData, setVoluntaryDeductionsData] = useState([]);
  useEffect(() => {
    console.log('useEffect');
    const getStatistics = async () => {
      const data = await getVoluntaryDeductionsStatistics(user.Cedula);
      console.log(data);
      if (data) {
        let labels = [];
        let dataValues = [];
        data.forEach((element) => {
          labels.push(element.Nombre);
          dataValues.push(element.empleados);
        });
        setVoluntaryDeductionsLabels(labels);
        setVoluntaryDeductionsData(dataValues);
        console.log(labels);
        console.log(dataValues);
      }
    };
    getStatistics();
  }, []);
  //const voluntaryDeductionsLables = ['Gym', 'Almuerzo', 'Transporte'];
  //const voluntaryDeductionsData = [4, 3, 7];


  return (
    <div className='voluntaryDeductions-graphic-container'>
      <h3> Voluntary deductions selected by employees</h3>
      <BarPlot
        dataLabels={voluntaryDeductionsLables}
        dataValues={voluntaryDeductionsData}
        plotLabel={'Voluntary Deductions'}
      />
    </div>

  )
}
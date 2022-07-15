import { React, useState, useEffect } from "react";
import { DoughnutPlot } from '../Plots/DoughnutPlot'
import { useSelector } from "react-redux";
import { getBenefitsStatistics } from "../../Utils/Benefits/getBenefitsStatistics";

export const BenefitsGraphic = () => {
  const user = useSelector((state) => state.user.user);
  const [infoReceived, setInfoReceived] = useState(false);
  const [benefitsLables, setBenefitsLables] = useState([]);
  const [benefitsData, setBenefitsData] = useState([]);
  useEffect(() => {
    const getStatistics = async () => {
      const data = await getBenefitsStatistics(user.Cedula);
      if (data) {
        let labels = [];
        let dataValues = [];
        data.forEach((element) => {
          labels.push(element.Nombre);
          dataValues.push(element.empleados);
        });
        setBenefitsLables(labels);
        setBenefitsData(dataValues);
        setInfoReceived(true);
      }
    };
    getStatistics();
  }, []);

  return !infoReceived ? <div className='loader' ></div > : (
    <div className='benefit-graphic-container'>
      <h3> Benefits selected by employees</h3>
      <DoughnutPlot
        dataLabels={benefitsLables}
        dataValues= {benefitsData}
      />
    </div>    
    
  )
}

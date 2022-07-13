import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const BarPlot = ({plotLabel ,dataLabels, dataValues}) => {
  
  console.log(plotLabel ,dataLabels, dataValues)
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: plotLabel,
      },
    },
  };
  
  const labels = dataLabels;
  const data = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: ['rgba(255, 99, 132, 0.5)', 
                          'rgba(155, 255, 132, 0.5)', 
                          'rgba(155, 120, 255, 0.5)', 
                          'rgba(255, 255, 255, 0.5)'],
      },
    ],
  };
  return <Bar options={options} data={data} />;
}

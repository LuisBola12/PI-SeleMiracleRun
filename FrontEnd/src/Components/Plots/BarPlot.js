import React from 'react';
import {Bar} from 'react-chartjs-2';

export const BarPlot = ({labels, label, data}) => {

  const state = {
    // TODO: Traer beneficios desde backend.
    labels: ['Fiesta de pizza', 'Dentista', 'Entradas para cine'],
    datasets: [
      {
        // TODO: cambiar por label
        label: 'Employees by benefit',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        // TODO: Traer cantidad desde backend
        data: [4, 6, 2],
      }
    ]
  }

  return (
    <div>
      <Bar
        data={state}
        options={{
          title:{
            display:true,
            // TODO: Cambiar por label
            text:'Benefits chosen by employees',
            fontSize:20
          },
          legend:{
            display:true,
            position:'right'
          }, 
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                min: 0,
                max: 10,
                stepSize: 1,
              }
            }]
          }
        }}
      />
    </div>
  );
}
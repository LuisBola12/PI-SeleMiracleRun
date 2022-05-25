import { useState } from 'react';
import { useSelector } from "react-redux";
const submitNewProject = async (name, paymentPeriod, emailFromUser) => {
  const postFetch = await fetch("http://localhost:4000/projects", {
    method: 'POST',
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      Nombre: name,
      Periodo: paymentPeriod,
      Email: emailFromUser,
    }),
  });
  console.log(postFetch);
}


export const useAddNewProject = (actualData, setActualData) => {

  const [name, setName] = useState('');
  const [paymentPeriod, setPaymentPeriod] = useState('Mensual');
  const [warning, setWarning,] = useState('');
  const emailFromUser = useSelector((state) => state.user.user.Email);


  const addNewEntry = (newEntry) => {
    setActualData([...actualData, newEntry]);
    submitNewProject(newEntry.Nombre, newEntry.TipoPeriodo, emailFromUser);
  }

  const addToTable = (cover) => {
    if (name && paymentPeriod) {
      const names = [];
      actualData.map((index) => {
        return names.push(index.name);
      })
      if (!names.includes(name)) {
        const newData = {
          Nombre: name,
          TipoPeriodo: paymentPeriod,
        };
        addNewEntry(newData);
        setWarning('');
        setName("");
        setPaymentPeriod("");
        cover();
      } else {
        setWarning('*That Project Name already exist')
      }

    }
    else {
      setWarning('*Please enter all the values')
    }
  }


  return {
    name, setName,
    paymentPeriod, setPaymentPeriod,
    warning, setWarning,
    addToTable
  }
}

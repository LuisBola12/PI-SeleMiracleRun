import { useState } from "react";
import { useSelector } from "react-redux";

export const usePostToDatabase = (data, setData) => {
  const [viewModal, setViewModal] = useState(false);
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const [name, setName] = useState('');
  const [cost, setCost] = useState(0);
  const apiBenefits = `http://localhost:4000/benefits`

  const submitBenefit = async () => {
    const postFetch = await fetch(apiBenefits, {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        Nombre: name,
        NombreProyecto: activeProject,
        CostoActual: cost,
      }),
    });
  }

  const addToTable = () => {
    if (name && cost && name.trim().length > 0) {
      const names = [];
      data.map((index) => {
        return names.push(index.Nombre);
      })
      if (!names.includes(name)) {
        const newData = {
          Nombre: name,
          CostoActual: cost,
        };
        setData([...data, newData]);
        submitBenefit();
        setViewModal(false);
        setName("");
        setCost("");
      } else {
        alert('That benefit already exist')
      }

    }
    else {
      alert('Please enter all the values')
    }
  }
  return {
    name, setName, cost, setCost, viewModal, setViewModal, addToTable
  }
}
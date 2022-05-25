import { useState } from "react";
import { useSelector } from "react-redux";

export const usePostToDatabase = (data, setData) => {
  const [viewModal, setViewModal] = useState(false);
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const [name, setName] = useState('');
  const apiVolDeductions = `http://localhost:4000/volDeductions`

  const submitVolDeduction = async () => {
    const postFetch = await fetch(apiVolDeductions, {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        Nombre: name,
        NombreProyecto: activeProject,
        PorcentajeEmpleador: 0.0,
        PorcentajeEmpleado: 0.0,
      }),
    });
  }

  const addToTable = () => {
    if (name && name.trim().length > 0) {
      const names = [];
      data.map((index) => {
        return names.push(index.Nombre);
      })
      if (!names.includes(name)) {
        const newData = {
          Nombre: name,
        };
        setData([...data, newData]);
        submitVolDeduction();
        setViewModal(false);
        setName("");
      } else {
        alert('That voluntary deduction already exists')
      }

    }
    else {
      alert('Please enter all the values')
    }
  }
  return {
    name, setName, viewModal, setViewModal, addToTable
  }
}
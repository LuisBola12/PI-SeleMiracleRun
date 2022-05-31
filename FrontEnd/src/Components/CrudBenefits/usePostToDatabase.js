import { useState } from "react";
import { useSelector } from "react-redux";

export const usePostToDatabase = () => {
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [description, setDescription] = useState('');
  const apiBenefits = `http://localhost:4000/benefits`

  const submitBenefit = async () => {
    const newCost = cost.split('.').join('');
    const postFetch = await fetch(apiBenefits, {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        Nombre: name,
        NombreProyecto: activeProject,
        CostoActual: parseInt(newCost),
        Descripción: description,
      }),
    });
  }

  return {
    name, setName, cost, setCost, description, setDescription, submitBenefit
  }
}
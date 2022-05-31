import { useState } from "react";
import { useSelector } from "react-redux";

export const usePostToDatabase = () => {
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [description, setDescription] = useState('');
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
        Costo: parseInt(cost),
        Descripcion: description,
      }),
    });
  }

  return {
    name, setName, cost, setCost, description, setDescription, submitVolDeduction
  }
}
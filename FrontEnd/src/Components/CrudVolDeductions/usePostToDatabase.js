import { useSelector } from "react-redux";

export const usePostToDatabase = () => {
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const apiVolDeductions = `http://localhost:4000/volDeductions`

  const submitVolDeduction = async (name, cost, description) => {
    const newCost = cost.split('.').join('');
    const postFetch = await fetch(apiVolDeductions, {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        Nombre: name,
        NombreProyecto: activeProject,
        Costo: parseInt(newCost),
        Descripcion: description,
      }),
    });
  }

  return {
    submitVolDeduction
  }
}
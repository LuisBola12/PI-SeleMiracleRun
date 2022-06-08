import { useSelector } from "react-redux";

export const usePutToVolDeductions = () => {
  const activeProject = useSelector((state) => state.activeProject.projectName);

  const updateVolDeduction = async (name, cost, description, apiVolDeductions) => {
    const newCost = cost.split('.').join('');
    const postFetch = await fetch(apiVolDeductions, {
      method: 'PUT',
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
    updateVolDeduction
  }
}
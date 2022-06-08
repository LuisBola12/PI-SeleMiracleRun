import { useSelector } from "react-redux";

export const usePutToBenefits = () => {
  const activeProject = useSelector((state) => state.activeProject.projectName);

  const updateBenefit = async (name, cost, description, apiBenefits) => {
    const newCost = cost.split('.').join('');
    const postFetch = await fetch(apiBenefits, {
      method: 'PUT',
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
    updateBenefit
  }
}
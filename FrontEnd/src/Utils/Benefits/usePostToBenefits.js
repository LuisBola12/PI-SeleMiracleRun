import { useSelector } from "react-redux";

export const usePostToBenefits = () => {
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const apiBenefits = `http://localhost:4000/benefits`

  const submitBenefit = async (name, cost, description) => {
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
    submitBenefit
  }
}
import { useSelector } from 'react-redux';

export const usePutToVoluntaryDeductions = () => {
  const activeProject = useSelector((state) => state.activeProject.projectName);

  const updateVoluntaryDeduction = async (name, cost, description, apiVoluntaryDeductions) => {
    const newCost = cost.split('.').join('');
    const postFetch = await fetch(apiVoluntaryDeductions, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        Nombre: name,
        NombreProyecto: activeProject,
        Costo: parseInt(newCost),
        Descripcion: description,
      }),
    });
    console.log(postFetch);
  };
  return {
    updateVoluntaryDeduction
  };
};
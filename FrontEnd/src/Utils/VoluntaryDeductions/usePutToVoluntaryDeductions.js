import { useSelector } from 'react-redux';

export const usePutTovoluntaryDeductions = () => {
  const activeProject = useSelector((state) => state.activeProject.projectName);

  const updatevoluntaryDeduction = async (name, cost, description, apivoluntaryDeductions) => {
    const newCost = cost.split('.').join('');
    const postFetch = await fetch(apivoluntaryDeductions, {
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
    updatevoluntaryDeduction
  };
};